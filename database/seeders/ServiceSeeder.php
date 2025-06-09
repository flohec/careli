<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('services')->insert([
            [
                'name' => 'Wartung',
                'price' => '100.00',
                'recurring' => true,
                'interval' => 12,
            ],
            [
                'name' => 'Schulung',
                'price' => '120.00',
                'recurring' => false,
                'interval' => null,
            ],
            [
                'name' => 'Montage',
                'price' => '340.00',
                'recurring' => false,
                'interval' => null,
            ],
            [
                'name' => 'Lifecycle Replacement',
                'price' => '0.00',
                'recurring' => true,
                'interval' => null,
            ],
        ]);
    }
}
