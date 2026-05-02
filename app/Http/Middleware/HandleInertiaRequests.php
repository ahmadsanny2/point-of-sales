<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'appSettings' => [
                'store'      => (new \App\Services\SettingService())->getStoreSettings(),
                'appearance' => \App\Models\Setting::getGroup('appearance'),
                'receipt'    => (new \App\Services\SettingService())->getReceiptSettings(),
                'landing'    => (new \App\Services\SettingService())->getLandingSettings(),
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'error' => fn () => $request->session()->get('error'),
                'snap_token' => fn () => $request->session()->get('snap_token'), // Legacy if needed
                'tripay_transaction' => fn () => $request->session()->get('tripay_transaction'),
            ],
        ];
    }
}
