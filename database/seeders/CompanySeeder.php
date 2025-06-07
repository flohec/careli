<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('companies')->insert([
            'name' => 'IT-MIT-HIRN',
            'email' => 'contact@it-mit-hirn.com',
            'discount' => 5.00,
        ]);
    }
}
