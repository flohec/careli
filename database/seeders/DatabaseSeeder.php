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
        $this->call(RoleSeeder::class);
        $this->call(CompanySeeder::class);
        $this->call(UserSeeder::class);
        $this->call(AddresseeSeeder::class);
        $this->call(ArticleCategorySeeder::class);
        $this->call(ServiceSeeder::class);
    }
}
