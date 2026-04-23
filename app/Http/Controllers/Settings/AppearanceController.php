<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\AppearanceRequest;
use App\Models\Setting;
use App\Services\SettingService;
use Inertia\Inertia;

class AppearanceController extends Controller
{
    public function __construct(private SettingService $settingService) {}

    public function index()
    {
        return Inertia::render('Settings/Appearance', [
            'settings' => $this->settingService->getAppearanceSettings(),
        ]);
    }

    public function update(AppearanceRequest $request)
    {
        $this->settingService->saveAppearanceSettings($request->validated());

        return back()->with('message', 'Pengaturan tampilan berhasil disimpan.');
    }
}
