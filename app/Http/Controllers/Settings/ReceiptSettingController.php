<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ReceiptSettingRequest;
use App\Models\Setting;
use App\Services\SettingService;
use Inertia\Inertia;

class ReceiptSettingController extends Controller
{
    public function __construct(private SettingService $settingService) {}

    public function index()
    {
        return Inertia::render('Settings/Receipt', [
            'settings' => $this->settingService->getReceiptSettings(),
        ]);
    }

    public function update(ReceiptSettingRequest $request)
    {
        $this->settingService->saveReceiptSettings($request->validated());

        return back()->with('message', 'Pengaturan struk berhasil disimpan.');
    }
}
