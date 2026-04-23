<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\StoreSettingRequest;
use App\Models\Setting;
use App\Services\SettingService;
use Inertia\Inertia;

class StoreSettingController extends Controller
{
    public function __construct(private SettingService $settingService) {}

    public function index()
    {
        return Inertia::render('Settings/Store', [
            'settings' => $this->settingService->getStoreSettings(),
        ]);
    }

    public function update(StoreSettingRequest $request)
    {
        $data = $request->validated();
        $logo = $request->file('logo');

        // Pisahkan file dari data teks
        unset($data['logo']);

        $this->settingService->saveStoreSettings($data, $logo);

        return back()->with('message', 'Pengaturan toko berhasil disimpan.');
    }
}
