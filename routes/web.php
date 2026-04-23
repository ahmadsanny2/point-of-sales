<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\Settings\StoreSettingController;
use App\Http\Controllers\Settings\AppearanceController;
use App\Http\Controllers\Settings\LandingPageController;
use App\Http\Controllers\Settings\ReceiptSettingController;
use App\Http\Controllers\Settings\UserManagementController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    // Kiosk POS (Accessible by all auth users like Staff and Admin)
    Route::get('/pos', [PosController::class, 'index'])->name('pos.index');
    Route::post('/pos/checkout', [PosController::class, 'checkout'])->name('pos.checkout');
    Route::post('/pos/payment-callback', [PosController::class, 'handleCallback'])
        ->name('pos.payment-callback')
        ->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]); // For older Laravel or if manually handled
    
    // In Laravel 11, we usually use bootstrap/app.php for CSRF exemption, 
    // but adding it here is a common pattern in some setups.
    // Let's just add the route for now.
    Route::post('/pos/payment-callback', [PosController::class, 'handleCallback'])->name('pos.payment-callback');
    
    // Cart management
    Route::post('/pos/cart/add', [PosController::class, 'addToCart'])->name('pos.cart.add');
    Route::put('/pos/cart/update', [PosController::class, 'updateQuantity'])->name('pos.cart.update');
    Route::delete('/pos/cart/remove', [PosController::class, 'removeFromCart'])->name('pos.cart.remove');

    // User Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Protected Routes
    Route::middleware(['admin', 'verified'])->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

        Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
        Route::get('/transactions/{id}', [TransactionController::class, 'show'])->name('transactions.show');

        Route::resource('categories', CategoryController::class);
        Route::resource('products', ProductController::class);

        // Settings / CMS Routes
        Route::prefix('settings')->name('settings.')->group(function () {
            // Pengaturan Toko
            Route::get('store', [StoreSettingController::class, 'index'])->name('store');
            Route::post('store', [StoreSettingController::class, 'update'])->name('store.update');

            // Pengaturan Tampilan
            Route::get('appearance', [AppearanceController::class, 'index'])->name('appearance');
            Route::post('appearance', [AppearanceController::class, 'update'])->name('appearance.update');

            // Pengaturan Landing Page
            Route::get('landing', [LandingPageController::class, 'index'])->name('landing');
            Route::post('landing', [LandingPageController::class, 'update'])->name('landing.update');

            // Pengaturan Struk
            Route::get('receipt', [ReceiptSettingController::class, 'index'])->name('receipt');
            Route::post('receipt', [ReceiptSettingController::class, 'update'])->name('receipt.update');

            // Manajemen User/Staff
            Route::get('users', [UserManagementController::class, 'index'])->name('users.index');
            Route::get('users/create', [UserManagementController::class, 'create'])->name('users.create');
            Route::post('users', [UserManagementController::class, 'store'])->name('users.store');
            Route::get('users/{user}/edit', [UserManagementController::class, 'edit'])->name('users.edit');
            Route::put('users/{user}', [UserManagementController::class, 'update'])->name('users.update');
            Route::delete('users/{user}', [UserManagementController::class, 'destroy'])->name('users.destroy');
        });
    });
});

require __DIR__ . '/auth.php';
