<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('roles')->insert([
            [
                'name' => 'admin',
                'slug' => 'admin',
                'description' => 'Hat volle Rechte für alles',
            ],
            [
                'name' => 'customer',
                'slug' => 'customer',
                'description' => 'B2C Kunde mit begrenzten Rechten',
            ],
            [
                'name' => 'business_customer',
                'slug' => 'business.customer',
                'description' => 'B2B Kunde mit begrenzten Rechten',
            ],
        ]);
    }
}
