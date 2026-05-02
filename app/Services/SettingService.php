<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class SettingService
{
    public const DEFAULTS = [
        'store' => [
            'name'        => 'Toko POS',
            'tagline'     => 'Sistem Kasir Modern',
            'address'     => '',
            'phone'       => '',
            'email'       => '',
            'tax_percent' => 0,
            'logo_path'   => null,
            'show_logo'   => '1',
        ],

        'landing' => [
            'hero_badge'        => 'Sistem POS Terpercaya #1 di Indonesia',
            'hero_title'        => 'Kasir Cerdas untuk Bisnis Modern',
            'hero_subtitle'     => 'Kelola transaksi, produk, dan laporan keuangan bisnis Anda dalam satu platform yang elegan. Dari warung kecil hingga jaringan ritel besar.',
            'hero_cta_text'     => 'Mulai Gratis — Sekarang',
            
            'features_title'    => 'Fitur Unggulan',
            'features_subtitle' => 'Semua yang Bisnis Anda Butuhkan',
            'features_description' => 'Dirancang untuk kemudahan operasional sehari-hari, dari transaksi hingga laporan keuangan lengkap.',
            
            'stats_title'       => 'Membantu bisnis berkembang',
            
            'how_it_works_title' => 'Cara Kerja',
            'how_it_works_subtitle' => 'Setup Dalam 3 Langkah Mudah',
            
            'pricing_title'     => 'Harga Terjangkau',
            'pricing_subtitle'  => 'Harga Transparan, Tanpa Kejutan',
            'pricing_description'=> 'Tanpa biaya tersembunyi. Bayar sesuai kebutuhan bisnis Anda.',
            
            'testimonials_title' => 'Kata Mereka',
            'testimonials_subtitle' => 'Dipercaya Ribuan Pebisnis',
            
            'cta_banner_title'  => 'Siap Tingkatkan Bisnis Anda?',
            'cta_banner_subtitle' => 'Bergabung dengan ribuan pebisnis yang sudah menggunakan SalePOS. Coba gratis 30 hari, tidak perlu kartu kredit.',
            'cta_banner_primary_text' => 'Daftar Gratis Sekarang',
            'cta_banner_secondary_text' => 'Sudah Punya Akun',
            
            'footer_description'=> 'Sistem point-of-sale modern yang membantu bisnis Indonesia tumbuh lebih cepat dan efisien.',
            'footer_text'       => '© 2026 SalePOS. All rights reserved.',
        ],
        'receipt' => [
            'receipt_header' => 'Terima kasih telah berbelanja!',
            'receipt_footer' => 'Barang yang sudah dibeli tidak dapat dikembalikan.',
            'invoice_prefix' => 'INV',
            'show_logo'      => '1',
            'paper_size'     => 'thermal',
        ],
    ];

    public function getDefaults(): array
    {
        return self::DEFAULTS;
    }

    public function getStoreSettings(): array
    {
        return array_merge(self::DEFAULTS['store'], Setting::getGroup('store'));
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
        } elseif (!empty($data['remove_logo'])) {
            // Hapus logo jika diperintahkan
            $oldLogo = Setting::get('store.logo_path');
            if ($oldLogo) {
                Storage::disk('public')->delete($oldLogo);
            }
            $data['logo_path'] = null;
        }

        // Hapus field pembantu sebelum menyimpan
        unset($data['remove_logo']);

        Setting::setMany('store', $data);
    }



    public function getLandingSettings(): array
    {
        return array_merge(self::DEFAULTS['landing'], Setting::getGroup('landing'));
    }

    public function getReceiptSettings(): array
    {
        return array_merge(self::DEFAULTS['receipt'], Setting::getGroup('receipt'));
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
