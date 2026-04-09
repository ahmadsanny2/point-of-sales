<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        $stats = [
            'totalProducts' => Product::count(),
            'todayTransactions' => Transaction::whereDate('created_at', $today)->count(),
            'todayRevenue' => Transaction::whereDate('created_at', $today)->sum('total_amount'),
            'lowStockCount' => Product::where('stock', '<=', 5)->count(),
        ];

        $latestTransactions = Transaction::with('cashier')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'latestTransactions' => $latestTransactions,
        ]);
    }
}
