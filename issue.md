# Issue: Implementasi CMS (Content Management System) untuk Aplikasi POS

**Stack:** Laravel 11 + Inertia.js (React) + Tailwind CSS v3  
**Role yang bisa akses CMS:** `admin` only  
**Prinsip:** Clean Architecture, SOLID, Single Responsibility  

---

## 1. Latar Belakang & Tujuan

Saat ini aplikasi POS memiliki fitur manajemen Produk, Kategori, dan Transaksi yang hardcoded di kode. Tidak ada cara bagi admin untuk mengubah konten dinamis seperti nama toko, logo, warna tema, teks pada halaman landing, dll. tanpa menyentuh kode.

CMS ini bertujuan memberikan **kontrol penuh kepada admin** untuk mengubah semua konten aplikasi melalui antarmuka visual, tanpa memerlukan developer.

---

## 2. Scope Fitur CMS

### 2.1 Pengaturan Toko (Store Settings)
- Nama toko
- Logo toko (upload gambar)
- Alamat & nomor telepon toko
- Tagline / deskripsi singkat toko
- Mata uang (currency symbol, e.g. `Rp`)
- Persentase pajak (PPN/Tax %)
- Jam operasional (opsional, tampil di landing page)

### 2.2 Pengaturan Landing Page
- Teks hero (judul & subtitle)
- Teks tombol CTA
- Daftar fitur yang tampil (nama fitur, ikon, deskripsi)
- Konten footer (copyright, tagline)

### 2.3 Pengaturan Tampilan / Branding
- Warna primary (default: `#2563EB`)
- Warna accent (default: `#38BDF8`)
- Font utama (pilihan dropdown dari daftar Google Fonts)

### 2.4 Manajemen Staff / Pengguna
- Lihat daftar semua user (admin & staff)
- Tambah user baru (assign role: admin/staff)
- Edit nama, email, reset password user
- Non-aktifkan/hapus akun staff

### 2.5 Pengaturan Struk / Receipt
- Nama header struk
- Footer struk (misal: "Terima kasih atas kunjungan Anda")
- Tampilkan/sembunyikan logo di struk
- Format nomor invoice (prefix)

---

## 3. Arsitektur & Struktur File

Menggunakan pola **Repository Pattern** dan **Service Layer** untuk memisahkan logika bisnis dari controller.

```
app/
├── Http/
│   ├── Controllers/
│   │   └── Settings/
│   │       ├── StoreSettingController.php   # Pengaturan toko
│   │       ├── AppearanceController.php     # Branding & tema
│   │       ├── LandingPageController.php    # Konten landing
│   │       ├── ReceiptSettingController.php # Konfigurasi struk
│   │       └── UserManagementController.php # Manajemen staff
│   ├── Requests/
│   │   └── Settings/
│   │       ├── StoreSettingRequest.php
│   │       ├── AppearanceRequest.php
│   │       └── UserManagementRequest.php
│   └── Middleware/
│       └── AdminMiddleware.php  # Sudah ada, dipakai ulang
│
├── Models/
│   ├── Setting.php              # [BARU] Model key-value settings
│   └── User.php                 # Sudah ada, ditambah scope & method
│
├── Services/
│   └── SettingService.php       # [BARU] Business logic settings
│
└── Repositories/
    └── SettingRepository.php    # [BARU] Abstraksi akses data settings

database/
└── migrations/
    └── xxxx_create_settings_table.php  # [BARU]

resources/js/
└── Pages/
    └── Settings/
        ├── Index.jsx            # Halaman utama CMS (tab navigation)
        ├── Store.jsx            # Form pengaturan toko
        ├── Appearance.jsx       # Form branding & warna
        ├── LandingPage.jsx      # Form konten landing page
        ├── Receipt.jsx          # Form konfigurasi struk
        └── Users/
            ├── Index.jsx        # Daftar staff/user
            ├── Create.jsx       # Form tambah user
            └── Edit.jsx         # Form edit user

routes/
└── web.php  # Tambahkan route group /settings
```

---

## 4. Database Schema

### Tabel `settings` (Key-Value Store)

```sql
CREATE TABLE settings (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    group       VARCHAR(100) NOT NULL DEFAULT 'general',  -- store | appearance | landing | receipt
    key         VARCHAR(191) NOT NULL,
    value       LONGTEXT NULL,
    created_at  TIMESTAMP NULL,
    updated_at  TIMESTAMP NULL,
    UNIQUE KEY settings_group_key_unique (group, key)
);
```

**Pendekatan key-value** dipilih karena:
- Fleksibel: menambah setting baru tidak perlu migrasi baru
- Cocok untuk data konfigurasi yang heterogen
- Mudah di-cache dengan `Cache::remember()`

### Tabel `users` — Tambahkan kolom
Tabel sudah ada dengan kolom `role` (admin/staff). **Tidak perlu migrasi baru.** Cukup tambahkan kolom `is_active`:

```php
// Migration baru: add_is_active_to_users_table.php
$table->boolean('is_active')->default(true)->after('role');
```

---

## 5. Implementasi Backend

### 5.1 Migration `create_settings_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('group', 100)->default('general');
            $table->string('key');
            $table->longText('value')->nullable();
            $table->timestamps();
            $table->unique(['group', 'key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
```

### 5.2 Model `Setting.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    protected $fillable = ['group', 'key', 'value'];

    /**
     * Ambil nilai setting berdasarkan key.
     * Format: Setting::get('store.name', 'Default Toko')
     */
    public static function get(string $dotKey, mixed $default = null): mixed
    {
        [$group, $key] = explode('.', $dotKey, 2);

        $value = Cache::rememberForever("setting.{$group}.{$key}", function () use ($group, $key) {
            return static::where('group', $group)->where('key', $key)->value('value');
        });

        return $value ?? $default;
    }

    /**
     * Simpan atau update nilai setting.
     * Format: Setting::set('store.name', 'Toko Saya')
     */
    public static function set(string $dotKey, mixed $value): void
    {
        [$group, $key] = explode('.', $dotKey, 2);

        static::updateOrCreate(
            ['group' => $group, 'key' => $key],
            ['value' => $value]
        );

        Cache::forget("setting.{$group}.{$key}");
    }

    /**
     * Ambil semua setting dalam satu group sebagai array.
     */
    public static function getGroup(string $group): array
    {
        return Cache::rememberForever("settings.group.{$group}", function () use ($group) {
            return static::where('group', $group)
                ->pluck('value', 'key')
                ->toArray();
        });
    }

    /**
     * Simpan banyak setting sekaligus dari array.
     */
    public static function setMany(string $group, array $data): void
    {
        foreach ($data as $key => $value) {
            static::set("{$group}.{$key}", $value);
        }
        Cache::forget("settings.group.{$group}");
    }
}
```

### 5.3 Service `SettingService.php`

```php
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
}
```

### 5.4 Controller `StoreSettingController.php`

```php
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
```

### 5.5 Form Request `StoreSettingRequest.php`

```php
<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class StoreSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    public function rules(): array
    {
        return [
            'name'        => 'required|string|max:100',
            'tagline'     => 'nullable|string|max:255',
            'address'     => 'nullable|string|max:500',
            'phone'       => 'nullable|string|max:20',
            'currency'    => 'required|string|max:10',
            'tax_percent' => 'required|numeric|min:0|max:100',
            'logo'        => 'nullable|image|mimes:jpeg,png,jpg,webp|max:1024',
        ];
    }
}
```

### 5.6 UserManagementController.php

```php
<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    public function index()
    {
        $users = User::latest()->get(['id', 'name', 'email', 'role', 'is_active', 'created_at']);

        return Inertia::render('Settings/Users/Index', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:100',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role'     => 'required|in:admin,staff',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->route('settings.users.index')
            ->with('message', 'User berhasil ditambahkan.');
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name'      => 'required|string|max:100',
            'email'     => 'required|email|unique:users,email,' . $user->id,
            'role'      => 'required|in:admin,staff',
            'is_active' => 'required|boolean',
            'password'  => 'nullable|string|min:8|confirmed',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return back()->with('message', 'User berhasil diperbarui.');
    }

    public function destroy(User $user)
    {
        // Lindungi agar admin tidak bisa hapus dirinya sendiri
        if ($user->id === auth()->id()) {
            return back()->with('error', 'Anda tidak dapat menghapus akun sendiri.');
        }

        $user->delete();

        return redirect()->route('settings.users.index')
            ->with('message', 'User berhasil dihapus.');
    }
}
```

---

## 6. Routes

Tambahkan ke `routes/web.php` di dalam grup middleware `['admin', 'verified']`:

```php
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
    Route::post('users', [UserManagementController::class, 'store'])->name('users.store');
    Route::put('users/{user}', [UserManagementController::class, 'update'])->name('users.update');
    Route::delete('users/{user}', [UserManagementController::class, 'destroy'])->name('users.destroy');
});
```

---

## 7. Frontend — Halaman React

### 7.1 Struktur Navigasi Settings

Halaman `Settings/Index.jsx` berfungsi sebagai wrapper dengan tab navigasi:

```jsx
// resources/js/Pages/Settings/Index.jsx
// Tab: Toko | Tampilan | Landing Page | Struk | Pengguna
```

Setiap tab merender komponen form yang sesuai menggunakan Inertia `Link` dengan `preserveState`.

### 7.2 Contoh: `Settings/Store.jsx`

```jsx
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function StoreSettings({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        name: settings.name ?? '',
        tagline: settings.tagline ?? '',
        address: settings.address ?? '',
        phone: settings.phone ?? '',
        currency: settings.currency ?? 'Rp',
        tax_percent: settings.tax_percent ?? 0,
        logo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('settings.store.update'), {
            forceFormData: true, // Wajib karena ada file upload
        });
    };

    return (
        <AuthenticatedLayout>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Field: Nama Toko */}
                <input
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && <p>{errors.name}</p>}

                {/* Field: Logo Upload */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setData('logo', e.target.files[0])}
                />

                {/* ... field lainnya ... */}

                <button type="submit" disabled={processing}>
                    Simpan Pengaturan
                </button>
            </form>
        </AuthenticatedLayout>
    );
}
```

### 7.3 Konsumsi Setting di Seluruh Aplikasi

Setting harus tersedia secara global di frontend. Caranya melalui `HandleInertiaRequests.php`:

```php
// app/Http/Middleware/HandleInertiaRequests.php
public function share(Request $request): array
{
    return [
        ...parent::share($request),
        'auth' => ['user' => $request->user()],
        'appSettings' => [                          // <-- TAMBAHKAN INI
            'store'      => Setting::getGroup('store'),
            'appearance' => Setting::getGroup('appearance'),
            'receipt'    => Setting::getGroup('receipt'),
        ],
    ];
}
```

Kemudian di komponen React mana pun:

```jsx
import { usePage } from '@inertiajs/react';

const { appSettings } = usePage().props;
const storeName = appSettings.store?.name ?? 'Toko POS';
```

---

## 8. Seeder untuk Default Settings

```php
<?php
// database/seeders/SettingSeeder.php

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
```

---

## 9. Urutan Implementasi (untuk Junior Dev / LLM)

Ikuti urutan ini agar tidak ada dependency yang hilang:

### Phase 1 — Backend Foundation
- [ ] Buat migration `create_settings_table.php` → `php artisan migrate`
- [ ] Buat migration `add_is_active_to_users_table.php` → `php artisan migrate`
- [ ] Buat model `app/Models/Setting.php`
- [ ] Update model `app/Models/User.php` — tambahkan `is_active` ke `$fillable`
- [ ] Buat `app/Services/SettingService.php`
- [ ] Buat `database/seeders/SettingSeeder.php` → tambahkan ke `DatabaseSeeder.php` → `php artisan db:seed --class=SettingSeeder`

### Phase 2 — Controllers & Requests
- [ ] Buat folder `app/Http/Controllers/Settings/`
- [ ] Buat `StoreSettingController.php`
- [ ] Buat `AppearanceController.php` (ikuti pola StoreSettingController)
- [ ] Buat `LandingPageController.php` (ikuti pola StoreSettingController)
- [ ] Buat `ReceiptSettingController.php` (ikuti pola StoreSettingController)
- [ ] Buat `UserManagementController.php`
- [ ] Buat folder `app/Http/Requests/Settings/`
- [ ] Buat `StoreSettingRequest.php` dan request sejenis lainnya

### Phase 3 — Routes
- [ ] Tambahkan `use` statement untuk semua controller Settings baru di `routes/web.php`
- [ ] Tambahkan route group `/settings` di dalam middleware `['admin', 'verified']`

### Phase 4 — Share Global Settings via Inertia
- [ ] Update `app/Http/Middleware/HandleInertiaRequests.php` — tambahkan `appSettings` ke `share()`

### Phase 5 — Frontend React Pages
- [ ] Buat `resources/js/Pages/Settings/Store.jsx`
- [ ] Buat `resources/js/Pages/Settings/Appearance.jsx`
- [ ] Buat `resources/js/Pages/Settings/LandingPage.jsx`
- [ ] Buat `resources/js/Pages/Settings/Receipt.jsx`
- [ ] Buat `resources/js/Pages/Settings/Users/Index.jsx`
- [ ] Buat `resources/js/Pages/Settings/Users/Create.jsx`
- [ ] Buat `resources/js/Pages/Settings/Users/Edit.jsx`

### Phase 6 — Integrasi ke Halaman Lain
- [ ] Update `Welcome.jsx` — konsumsi `appSettings.landing` dari `usePage().props`
- [ ] Update `AuthenticatedLayout.jsx` — tampilkan nama toko dari `appSettings.store.name`
- [ ] Update `Receipt.jsx` — konsumsi `appSettings.receipt` untuk header/footer struk
- [ ] Update `PosController.php` — gunakan `Setting::get('store.tax_percent', 0)` untuk perhitungan pajak

### Phase 7 — Tambahkan Menu Settings ke Sidebar
- [ ] Update `AuthenticatedLayout.jsx` — tambahkan link menu "Pengaturan" yang hanya muncul jika `auth.user.role === 'admin'`

---

## 10. Checklist Kualitas Kode

Sebelum menganggap implementasi selesai, pastikan:

- [ ] Semua controller menggunakan **Form Request** untuk validasi (bukan `$request->validate()` inline)
- [ ] Semua akses ke `settings` table sudah melalui **cache** (`Cache::rememberForever`)
- [ ] Cache di-invalidate (`Cache::forget`) setiap kali setting diupdate
- [ ] Upload gambar menyimpan ke `storage/app/public/settings/` dan bisa diakses via `Storage::url()`
- [ ] Jalankan `php artisan storage:link` setelah pertama setup
- [ ] Tidak ada logika bisnis di Controller — semua ada di `SettingService`
- [ ] Semua route `settings.*` terlindungi middleware `['admin', 'verified']`
- [ ] Halaman React menggunakan `useForm` dari `@inertiajs/react` untuk semua form
- [ ] File upload menggunakan `forceFormData: true` pada `post()`
- [ ] Tambahkan `SweetAlert2` untuk konfirmasi sebelum hapus user

---

## 11. Perintah Artisan yang Diperlukan

```bash
# Setelah membuat migration baru
php artisan migrate

# Isi data default settings
php artisan db:seed --class=SettingSeeder

# Buat symlink public storage (wajib untuk akses logo)
php artisan storage:link

# Clear cache saat development
php artisan cache:clear

# Buat controller baru (opsional, bisa manual)
php artisan make:controller Settings/StoreSettingController
php artisan make:controller Settings/UserManagementController
php artisan make:model Setting -m
php artisan make:request Settings/StoreSettingRequest
```
