<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArticleCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('article_categories')->insert([
            [
                'name' => 'Standard Serverschränke',
                'slug' => 'standard',
            ],
            [
                'name' => 'Deluxe Serverschränke',
                'slug' => 'deluxe',
            ],
            [
                'name' => 'Kühlung',
                'slug' => 'cooling',
            ],
        ]);
    }
}
