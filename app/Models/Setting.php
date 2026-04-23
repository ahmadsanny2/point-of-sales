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
