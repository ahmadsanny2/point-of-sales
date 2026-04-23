<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PosController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $products = Product::where('status', 'active')
            ->where('stock', '>', 0)
            ->with('category')
            ->get();

        $cart = \App\Models\CartItem::where('user_id', Auth::id())
            ->with('product')
            ->get()
            ->map(function ($item) {
                return array_merge($item->product->toArray(), [
                    'quantity' => $item->quantity,
                    'cart_item_id' => $item->id, // optional
                ]);
            });

        return Inertia::render('Pos/Index', [
            'categories' => $categories,
            'products' => $products,
            'cart_items' => $cart,
            'midtrans_client_key' => env('MIDTRANS_CLIENT_KEY', ''),
            'is_production' => env('MIDTRANS_IS_PRODUCTION', false),
        ]);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $product = Product::findOrFail($request->product_id);
        
        $cartItem = \App\Models\CartItem::where('user_id', Auth::id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            if ($cartItem->quantity < $product->stock) {
                $cartItem->increment('quantity');
            } else {
                return back()->with('error', 'Stok tidak mencukupi.');
            }
        } else {
            if ($product->stock > 0) {
                \App\Models\CartItem::create([
                    'user_id' => Auth::id(),
                    'product_id' => $request->product_id,
                    'quantity' => 1
                ]);
            } else {
                return back()->with('error', 'Stok habis.');
            }
        }

        return back();
    }

    public function updateQuantity(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);
        
        if ($request->quantity > $product->stock) {
            return back()->with('error', 'Jumlah melebihi stok tersedia.');
        }

        \App\Models\CartItem::where('user_id', Auth::id())
            ->where('product_id' , $request->product_id)
            ->update(['quantity' => $request->quantity]);

        return back();
    }

    public function removeFromCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        \App\Models\CartItem::where('user_id', Auth::id())
            ->where('product_id', $request->product_id)
            ->delete();

        return back();
    }

    public function checkout(Request $request)
    {
        $validated = $request->validate([
            'payment_method' => 'required|in:cash,qris,card',
            'cart' => 'required|array|min:1',
            'cart.*.id' => 'required|exists:products,id',
            'cart.*.quantity' => 'required|integer|min:1',
        ]);

        try {
            DB::beginTransaction();

            $totalAmount = 0;
            $itemsData = [];

            // Verify stock and calculate total
            foreach ($validated['cart'] as $item) {
                $product = Product::lockForUpdate()->find($item['id']);
                
                if ($product->stock < $item['quantity']) {
                    throw new \Exception("Stok untuk produk {$product->name} tidak mencukupi.");
                }

                $subtotal = $product->price * $item['quantity'];
                $totalAmount += $subtotal;

                $itemsData[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'subtotal' => $subtotal,
                ];

                // Deduct stock immediately ONLY if cash
                if ($validated['payment_method'] === 'cash') {
                    $product->decrement('stock', $item['quantity']);
                }
            }

            $taxPercent = (float) \App\Models\Setting::get('store.tax_percent', 0);
            $taxAmount = $totalAmount * ($taxPercent / 100);
            $grandTotal = $totalAmount + $taxAmount;

            $isCash = $validated['payment_method'] === 'cash';
            $prefix = \App\Models\Setting::get('receipt.invoice_prefix', 'INV');

            // Create Transaction
            $transaction = Transaction::create([
                'user_id' => Auth::id(),
                'invoice_number' => $prefix . '-' . date('Ymd') . '-' . mt_rand(1000, 9999),
                'total_amount' => $grandTotal,
                'payment_method' => $validated['payment_method'],
                'status' => $isCash ? 'paid' : 'pending',
            ]);

            // Insert Items
            foreach ($itemsData as $data) {
                $transaction->items()->create($data);
            }

            if ($isCash) {
                // Clear database cart
                \App\Models\CartItem::where('user_id', Auth::id())->delete();
                
                DB::commit();
                return redirect()->back()->with('message', 'Transaksi berhasil diselesaikan! Invoice: ' . $transaction->invoice_number);
            }

            // --- Midtrans Integration ---
            $serverKey = env('MIDTRANS_SERVER_KEY');
            $isProduction = env('MIDTRANS_IS_PRODUCTION', false);
            $baseUrl = $isProduction ? 'https://app.midtrans.com/snap/v1/transactions' : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

            $params = [
                'transaction_details' => [
                    'order_id' => $transaction->invoice_number,
                    'gross_amount' => (int) $grandTotal,
                ],
                'customer_details' => [
                    'first_name' => Auth::user() ? Auth::user()->name : 'Customer',
                    'email' => Auth::user() ? Auth::user()->email : 'customer@pos.local',
                ]
            ];

            $response = \Illuminate\Support\Facades\Http::withBasicAuth($serverKey, '')
                ->post($baseUrl, $params);

            if ($response->successful()) {
                $snapToken = $response->json('token');
                
                // Clear database cart here as well or in paymentSuccess? 
                // Better in paymentSuccess for robustness, but usually clear on checkout start is fine for POS.
                // However, if the user closes snap, they might want their cart back.
                // Let's clear ONLY upon success.
                
                DB::commit();
                
                return redirect()->back()->with('snap_token', [
                    'token' => $snapToken,
                    'invoice' => $transaction->invoice_number
                ]);
            } else {
                throw new \Exception('Gagal memproses gateway pembayaran: ' . json_encode($response->json()));
            }

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function paymentSuccess(Request $request)
    {
        $validated = $request->validate([
            'invoice_number' => 'required|string|exists:transactions,invoice_number',
        ]);

        try {
            DB::beginTransaction();
            $transaction = Transaction::where('invoice_number', $validated['invoice_number'])->lockForUpdate()->firstOrFail();

            if ($transaction->status === 'paid') {
                DB::rollBack();
                return redirect()->route('pos.index')->with('message', 'Pembayaran sudah pernah diselesaikan. Invoice: ' . $transaction->invoice_number);
            }

            // Deduct stock
            $items = $transaction->items;
            foreach ($items as $item) {
                $product = Product::find($item->product_id);
                if ($product) {
                    $product->decrement('stock', $item->quantity);
                }
            }

            // Update status
            $transaction->update([
                'status' => 'paid'
            ]);

            // Clear database cart
            \App\Models\CartItem::where('user_id', Auth::id())->delete();

            DB::commit();
            return redirect()->route('pos.index')->with('message', 'Pembayaran Midtrans Berhasil! Invoice: ' . $transaction->invoice_number);

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('pos.index')->with('error', 'Terjadi kesalahan saat memproses Payment Webhook: ' . $e->getMessage());
        }
    }
}
