<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            ['group' => 'store',      'key' => 'name',          'value' => 'Toko POS'],
            ['group' => 'store',      'key' => 'tagline',       'value' => 'Sistem Kasir Modern'],
            ['group' => 'store',      'key' => 'currency',      'value' => 'Rp'],
            ['group' => 'store',      'key' => 'tax_percent',   'value' => '0'],
            ['group' => 'appearance', 'key' => 'primary_color', 'value' => '#2563EB'],
            ['group' => 'appearance', 'key' => 'accent_color',  'value' => '#38BDF8'],
            ['group' => 'appearance', 'key' => 'font_family',   'value' => 'Inter'],
            ['group' => 'landing',    'key' => 'hero_title',    'value' => 'Sistem POS Modern'],
            ['group' => 'landing',    'key' => 'hero_subtitle', 'value' => 'Kelola kasir dengan mudah'],
            ['group' => 'landing',    'key' => 'cta_text',      'value' => 'Mulai Sekarang'],
            ['group' => 'landing',    'key' => 'footer_text',   'value' => '© 2026 Toko POS. All rights reserved.'],
            ['group' => 'receipt',    'key' => 'invoice_prefix','value' => 'INV'],
            ['group' => 'receipt',    'key' => 'receipt_header','value' => 'Terima kasih telah berbelanja!'],
            ['group' => 'receipt',    'key' => 'receipt_footer','value' => 'Barang yang sudah dibeli tidak dapat dikembalikan.'],
            ['group' => 'receipt',    'key' => 'show_logo',     'value' => '1'],
        ];

        foreach ($defaults as $setting) {
            Setting::firstOrCreate(
                ['group' => $setting['group'], 'key' => $setting['key']],
                ['value' => $setting['value']]
            );
        }
    }
}
