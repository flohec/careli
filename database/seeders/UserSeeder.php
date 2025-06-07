<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'first_name' => 'Florian',
                'name' => 'Heck',
                'email' => 'flohec027@gmail.com',
                'password' => 'test1234', // Note: In a real application, use Hash::make('test1234')
                'company_id' => null,
                'role_id' => 1,
            ],
            [
                'first_name' => 'Jane',
                'name' => 'Smith',
                'email' => 'customer@example.com',
                'password' => 'test1234', // Note: In a real application, use Hash::make('test1234')
                'company_id' => null,
                'role_id' => 2,
            ],
            [
                'first_name' => 'Alice',
                'name' => 'Johnson',
                'email' => 'business_customer@example.com',
                'password' => 'test1234', // Note: In a real application, use Hash::make('test1234')
                'company_id' => 1,
                'role_id' => 3,
            ],
        ]);
    }
}
