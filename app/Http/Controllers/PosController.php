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
            'products' => $products
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
                $totalAmount += $subtotal; // If we needed tax, calculate here

                $itemsData[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'subtotal' => $subtotal,
                ];

                // Deduct stock
                $product->decrement('stock', $item['quantity']);
            }

            // Create Transaction
            $transaction = Transaction::create([
                'user_id' => Auth::id(),
                'invoice_number' => 'INV-' . date('Ymd') . '-' . mt_rand(1000, 9999),
                'total_amount' => $totalAmount,
                'payment_method' => $validated['payment_method'],
                'status' => 'paid',
            ]);

            // Insert Items
            foreach ($itemsData as $data) {
                $transaction->items()->create($data);
            }

            DB::commit();

            return redirect()->back()->with('message', 'Transaksi berhasil diselesaikan! Invoice: ' . $transaction->invoice_number);

        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
