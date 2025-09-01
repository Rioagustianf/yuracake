<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class BestSellerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample products with best seller status
        $products = [
            [
                'name' => 'Kue Tart Coklat Premium',
                'description' => 'Kue tart coklat lezat dengan lapisan ganache premium dan hiasan buah segar. Cocok untuk ulang tahun dan acara spesial.',
                'price' => 150000,
                'stock' => 20,
                'is_best_seller' => true,
                'image' => null,
            ],
            [
                'name' => 'Cupcake Rainbow',
                'description' => 'Cupcake warna-warni dengan buttercream lembut. Tersedia dalam berbagai rasa vanilla, coklat, dan strawberry.',
                'price' => 35000,
                'stock' => 50,
                'is_best_seller' => true,
                'image' => null,
            ],
            [
                'name' => 'Brownies Fudgy',
                'description' => 'Brownies tekstur fudgy dengan topping almond dan choco chips. Sempurna untuk pencinta coklat.',
                'price' => 45000,
                'stock' => 30,
                'is_best_seller' => true,
                'image' => null,
            ],
            [
                'name' => 'Kue Sus Krim',
                'description' => 'Kue sus renyah berisi krim vanilla yang lembut. Camilan klasik yang selalu digemari.',
                'price' => 25000,
                'stock' => 40,
                'is_best_seller' => false,
                'image' => null,
            ],
            [
                'name' => 'Red Velvet Cake',
                'description' => 'Kue red velvet lembut dengan cream cheese frosting. Warna merah yang cantik dan rasa yang istimewa.',
                'price' => 120000,
                'stock' => 15,
                'is_best_seller' => true,
                'image' => null,
            ],
        ];

        foreach ($products as $productData) {
            Product::create($productData);
        }
    }
}
