<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Promo;
use App\Models\Product;
use Carbon\Carbon;

class PromoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get some products for the promos
        $products = Product::take(3)->get();
        
        if ($products->isEmpty()) {
            $this->command->info('No products found. Please run ProductSeeder first.');
            return;
        }

        // Create sample promos
        $promos = [
            [
                'title' => 'Flash Sale Weekend',
                'description' => 'Diskon spesial 25% untuk semua kue tart! Berlaku hanya akhir pekan ini.',
                'discount_type' => 'percentage',
                'discount_value' => 25.00,
                'min_purchase' => 100000,
                'max_discount' => 50000,
                'start_date' => Carbon::now(),
                'end_date' => Carbon::now()->addDays(7),
                'usage_limit' => 50,
                'promo_code' => 'WEEKEND25',
                'is_active' => true,
            ],
            [
                'title' => 'Diskon Hemat Rp 30.000',
                'description' => 'Potongan langsung Rp 30.000 untuk pembelian minimal Rp 200.000',
                'discount_type' => 'fixed',
                'discount_value' => 30000,
                'min_purchase' => 200000,
                'max_discount' => null,
                'start_date' => Carbon::now(),
                'end_date' => Carbon::now()->addDays(14),
                'usage_limit' => null,
                'promo_code' => 'HEMAT30K',
                'is_active' => true,
            ],
            [
                'title' => 'Promo Cupcake Spesial',
                'description' => 'Diskon 15% khusus untuk cupcake dan kue kecil. Cocok untuk acara kecil!',
                'discount_type' => 'percentage',
                'discount_value' => 15.00,
                'min_purchase' => 50000,
                'max_discount' => 25000,
                'start_date' => Carbon::now(),
                'end_date' => Carbon::now()->addDays(10),
                'usage_limit' => 100,
                'promo_code' => 'CUPCAKE15',
                'is_active' => true,
            ],
            [
                'title' => 'Mega Sale 40%',
                'description' => 'Promo terbesar tahun ini! Diskon hingga 40% untuk produk pilihan.',
                'discount_type' => 'percentage',
                'discount_value' => 40.00,
                'min_purchase' => 150000,
                'max_discount' => 100000,
                'start_date' => Carbon::now()->addDays(2),
                'end_date' => Carbon::now()->addDays(5),
                'usage_limit' => 30,
                'promo_code' => 'MEGASALE40',
                'is_active' => true,
            ],
        ];

        foreach ($promos as $index => $promoData) {
            $promo = Promo::create($promoData);
            
            // Attach some products to each promo
            if ($index < 2) {
                // First two promos apply to specific products
                $promo->products()->attach($products->take(2)->pluck('id'));
            }
            // Last two promos apply to all products (no attachment means all products)
        }
        
        $this->command->info('Sample promos created successfully!');
    }
}
