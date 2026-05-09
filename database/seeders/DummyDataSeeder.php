<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DummyDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create Categories
        $categories = [
            ['name' => 'Kopi', 'slug' => 'kopi'],
            ['name' => 'Non-Kopi', 'slug' => 'non-kopi'],
            ['name' => 'Makanan Berat', 'slug' => 'makanan-berat'],
            ['name' => 'Cemilan', 'slug' => 'cemilan'],
            ['name' => 'Minuman Dingin', 'slug' => 'minuman-dingin'],
        ];

        foreach ($categories as $cat) {
            $category = Category::updateOrCreate(['slug' => $cat['slug']], $cat);

            // 2. Create Products for each category
            if ($cat['slug'] === 'kopi') {
                $products = [
                    ['name' => 'Espresso', 'price' => 15000, 'stock' => 100, 'sku' => 'KOPI-001'],
                    ['name' => 'Americano', 'price' => 18000, 'stock' => 100, 'sku' => 'KOPI-002'],
                    ['name' => 'Cafe Latte', 'price' => 25000, 'stock' => 50, 'sku' => 'KOPI-003'],
                    ['name' => 'Cappuccino', 'price' => 25000, 'stock' => 50, 'sku' => 'KOPI-004'],
                    ['name' => 'Kopi Susu Gula Aren', 'price' => 22000, 'stock' => 200, 'sku' => 'KOPI-005'],
                ];
            } elseif ($cat['slug'] === 'non-kopi') {
                $products = [
                    ['name' => 'Matcha Latte', 'price' => 28000, 'stock' => 40, 'sku' => 'NON-001'],
                    ['name' => 'Chocolate Hot', 'price' => 25000, 'stock' => 60, 'sku' => 'NON-002'],
                    ['name' => 'Taro Latte', 'price' => 27000, 'stock' => 30, 'sku' => 'NON-003'],
                    ['name' => 'Red Velvet', 'price' => 27000, 'stock' => 35, 'sku' => 'NON-004'],
                ];
            } elseif ($cat['slug'] === 'makanan-berat') {
                $products = [
                    ['name' => 'Nasi Goreng Spesial', 'price' => 35000, 'stock' => 20, 'sku' => 'FOOD-001'],
                    ['name' => 'Mie Goreng Jawa', 'price' => 30000, 'stock' => 25, 'sku' => 'FOOD-002'],
                    ['name' => 'Ayam Geprek', 'price' => 25000, 'stock' => 40, 'sku' => 'FOOD-003'],
                    ['name' => 'Nasi Gila', 'price' => 28000, 'stock' => 20, 'sku' => 'FOOD-004'],
                ];
            } elseif ($cat['slug'] === 'cemilan') {
                $products = [
                    ['name' => 'Kentang Goreng', 'price' => 15000, 'stock' => 50, 'sku' => 'SNACK-001'],
                    ['name' => 'Cireng Rujak', 'price' => 12000, 'stock' => 40, 'sku' => 'SNACK-002'],
                    ['name' => 'Roti Bakar Coklat', 'price' => 18000, 'stock' => 30, 'sku' => 'SNACK-003'],
                    ['name' => 'Pisang Goreng Keju', 'price' => 15000, 'stock' => 45, 'sku' => 'SNACK-004'],
                ];
            } else {
                $products = [
                    ['name' => 'Ice Tea', 'price' => 8000, 'stock' => 500, 'sku' => 'DRINK-001'],
                    ['name' => 'Lemon Tea Ice', 'price' => 12000, 'stock' => 100, 'sku' => 'DRINK-002'],
                    ['name' => 'Lychee Tea', 'price' => 18000, 'stock' => 80, 'sku' => 'DRINK-003'],
                ];
            }

            foreach ($products as $prod) {
                Product::updateOrCreate(
                    ['sku' => $prod['sku']],
                    array_merge($prod, ['category_id' => $category->id, 'status' => 'active'])
                );
            }
        }
    }
}
