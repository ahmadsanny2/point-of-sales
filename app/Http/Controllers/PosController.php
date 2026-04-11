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

        return Inertia::render('Pos/Index', [
            'categories' => $categories,
            'products' => $products,
            'midtrans_client_key' => env('MIDTRANS_CLIENT_KEY', ''),
            'is_production' => env('MIDTRANS_IS_PRODUCTION', false),
        ]);
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

            $taxAmount = $totalAmount * 0.11;
            $grandTotal = $totalAmount + $taxAmount;

            $isCash = $validated['payment_method'] === 'cash';

            // Create Transaction
            $transaction = Transaction::create([
                'user_id' => Auth::id(),
                'invoice_number' => 'INV-' . date('Ymd') . '-' . mt_rand(1000, 9999),
                'total_amount' => $grandTotal,
                'payment_method' => $validated['payment_method'],
                'status' => $isCash ? 'paid' : 'pending',
            ]);

            // Insert Items
            foreach ($itemsData as $data) {
                $transaction->items()->create($data);
            }

            if ($isCash) {
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

            DB::commit();
            return redirect()->route('pos.index')->with('message', 'Pembayaran Midtrans Berhasil! Invoice: ' . $transaction->invoice_number);

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('pos.index')->with('error', 'Terjadi kesalahan saat memproses Payment Webhook: ' . $e->getMessage());
        }
    }
}
