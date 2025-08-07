<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Test Customer',
            'email' => 'customer@test.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
        ]);

        $this->command->info('Test customer created successfully!');
        $this->command->info('Email: customer@test.com');
        $this->command->info('Password: password');
    }
} 