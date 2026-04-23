<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\LandingPageRequest;
use App\Models\Setting;
use App\Services\SettingService;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function __construct(private SettingService $settingService) {}

    public function index()
    {
        return Inertia::render('Settings/LandingPage', [
            'settings' => $this->settingService->getLandingSettings(),
        ]);
    }

    public function update(LandingPageRequest $request)
    {
        $this->settingService->saveLandingSettings($request->validated());

        return back()->with('message', 'Pengaturan landing page berhasil disimpan.');
    }
}
