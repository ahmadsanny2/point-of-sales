<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with('cashier')
            ->latest()
            ->paginate(15);

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions
        ]);
    }

    public function show($id)
    {
        $transaction = Transaction::with(['cashier', 'items.product'])
            ->findOrFail($id);

        return Inertia::render('Transactions/Show', [
            'transaction' => $transaction
        ]);
    }
}
