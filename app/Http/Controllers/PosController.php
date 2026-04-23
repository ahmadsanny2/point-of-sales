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

            // --- Tripay Integration ---
            $apiKey = env('TRIPAY_API_KEY');
            $privateKey = env('TRIPAY_PRIVATE_KEY');
            $merchantCode = env('TRIPAY_MERCHANT_CODE');
            $mode = env('TRIPAY_MODE', 'sandbox');
            
            $baseUrl = $mode === 'live' 
                ? 'https://tripay.co.id/api/transaction/create' 
                : 'https://tripay.co.id/api-sandbox/transaction/create';

            // Map method to Tripay channel codes
            $method = $validated['payment_method'] === 'qris' ? 'QRIS' : 'BRIVA'; // Default to BRIVA for 'card' or others

            $signature = hash_hmac('sha256', $merchantCode . $transaction->invoice_number . (int)$grandTotal, $privateKey);

            $orderItems = [];
            foreach ($validated['cart'] as $item) {
                $product = Product::find($item['id']);
                $orderItems[] = [
                    'sku' => $product->sku ?? 'PROD-'.$product->id,
                    'name' => $product->name,
                    'price' => (int) $product->price,
                    'quantity' => (int) $item['quantity']
                ];
            }

            // Add tax as an item if needed for Tripay
            if ($taxAmount > 0) {
                $orderItems[] = [
                    'sku' => 'TAX',
                    'name' => 'Pajak ('.$taxPercent.'%)',
                    'price' => (int) $taxAmount,
                    'quantity' => 1
                ];
            }

            $params = [
                'method'         => $method,
                'merchant_ref'   => $transaction->invoice_number,
                'amount'         => (int) $grandTotal,
                'customer_name'  => Auth::user()->name,
                'customer_email' => Auth::user()->email,
                'customer_phone' => '081234567890',
                'order_items'    => $orderItems,
                'callback_url'   => route('pos.payment-callback'),
                'return_url'     => route('pos.index'),
                'expired_time'   => (time() + (24 * 60 * 60)), // 24 hours
                'signature'      => $signature
            ];

            $response = \Illuminate\Support\Facades\Http::withToken($apiKey)
                ->post($baseUrl, $params);

            if ($response->successful()) {
                $tripayData = $response->json('data');
                DB::commit();
                
                return redirect()->back()->with('tripay_transaction', $tripayData);
            } else {
                throw new \Exception('Gagal memproses Tripay: ' . json_encode($response->json()));
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

    public function handleCallback(Request $request)
    {
        $callbackSignature = $request->header('X-Callback-Signature');
        $json = $request->getContent();
        $signature = hash_hmac('sha256', $json, env('TRIPAY_PRIVATE_KEY'));

        if ($signature !== $callbackSignature) {
            return response()->json(['success' => false, 'message' => 'Invalid signature']);
        }

        $data = json_decode($json);
        $event = $request->header('X-Callback-Event');

        if ($event === 'payment_status') {
            $transaction = Transaction::where('invoice_number', $data->merchant_ref)->first();

            if (!$transaction) {
                return response()->json(['success' => false, 'message' => 'Transaction not found']);
            }

            if ($data->status === 'PAID') {
                if ($transaction->status !== 'paid') {
                    // Deduct stock
                    foreach ($transaction->items as $item) {
                        $product = Product::find($item->product_id);
                        if ($product) {
                            $product->decrement('stock', $item->quantity);
                        }
                    }

                    $transaction->update(['status' => 'paid']);
                    
                    // Clear cart for this user
                    \App\Models\CartItem::where('user_id', $transaction->user_id)->delete();
                }
            } elseif ($data->status === 'EXPIRED' || $data->status === 'FAILED') {
                $transaction->update(['status' => 'failed']);
            }
        }

        return response()->json(['success' => true]);
    }
}
