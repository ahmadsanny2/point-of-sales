<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin POS',
            'email' => 'admin@pos.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'Staff Kasir',
            'email' => 'staff@pos.com',
            'password' => bcrypt('password'),
            'role' => 'staff',
        ]);
        $this->call([
            SettingSeeder::class,
            DummyDataSeeder::class,
        ]);
    }
}
