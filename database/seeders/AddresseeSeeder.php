<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AddresseeSeeder extends Seeder
{
    public function run(): void
    {
        Company::all()->each(function ($company, $index) {
            // Adresse nur erstellen, wenn noch keine existiert
            if (!$company->address) {
                $company->address()->create([
                    'country' => 'Germany',
                    'postal_code' => '10' . str_pad($index, 3, '0', STR_PAD_LEFT),
                    'city' => 'Unternehmensstadt',
                    'street' => 'Firmenstraße ' . ($index + 1),
                ]);
            }
        });

        User::all()->each(function ($user, $index) {
            if (!$user->address) {
                $user->address()->create([
                    'country' => 'Germany',
                    'postal_code' => '20' . str_pad($index, 3, '0', STR_PAD_LEFT),
                    'city' => 'Benutzerstadt',
                    'street' => 'Benutzerweg ' . ($index + 1),
                ]);
            }
        });
    }
}
