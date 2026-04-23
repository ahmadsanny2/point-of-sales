<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class SettingService
{
    public function getStoreSettings(): array
    {
        return array_merge([
            'name'        => 'Toko POS',
            'tagline'     => 'Sistem Kasir Modern',
            'address'     => '',
            'phone'       => '',
            'currency'    => 'Rp',
            'tax_percent' => 0,
            'logo_path'   => null,
        ], Setting::getGroup('store'));
    }

    public function saveStoreSettings(array $data, ?UploadedFile $logo = null): void
    {
        if ($logo) {
            // Hapus logo lama jika ada
            $oldLogo = Setting::get('store.logo_path');
            if ($oldLogo) {
                Storage::disk('public')->delete($oldLogo);
            }
            $data['logo_path'] = $logo->store('settings', 'public');
        }

        Setting::setMany('store', $data);
    }

    public function getAppearanceSettings(): array
    {
        return array_merge([
            'primary_color' => '#2563EB',
            'accent_color'  => '#38BDF8',
            'font_family'   => 'Inter',
        ], Setting::getGroup('appearance'));
    }

    public function getLandingSettings(): array
    {
        return array_merge([
            'hero_title'    => 'Sistem POS Modern',
            'hero_subtitle' => 'Kelola kasir Anda dengan mudah dan efisien',
            'cta_text'      => 'Mulai Sekarang',
            'footer_text'   => '© 2026 Toko POS. All rights reserved.',
        ], Setting::getGroup('landing'));
    }

    public function getReceiptSettings(): array
    {
        return array_merge([
            'receipt_header'     => 'Terima kasih telah berbelanja!',
            'receipt_footer'     => 'Barang yang sudah dibeli tidak dapat dikembalikan.',
            'invoice_prefix'     => 'INV',
            'show_logo'          => '1',
        ], Setting::getGroup('receipt'));
    }

    public function saveAppearanceSettings(array $data): void
    {
        Setting::setMany('appearance', $data);
    }

    public function saveLandingSettings(array $data): void
    {
        Setting::setMany('landing', $data);
    }

    public function saveReceiptSettings(array $data): void
    {
        Setting::setMany('receipt', $data);
    }
}
