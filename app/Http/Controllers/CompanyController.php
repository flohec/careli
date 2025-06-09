<?php

namespace App\Http\Controllers;

use App\Http\Resources\CompanyResource;
use App\Http\Resources\UserResource;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function getAllCompanies(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $search = $request->query('search');

        $companies = Company::query()
            ->search($search)
            ->paginate($perPage);

        return response()->json([
            'message' => 'Users fetched successfully',
            'data' => CompanyResource::collection($companies->items()),
            'pagination' => [
                'total' => $companies->total(),
                'current_page' => $companies->currentPage(),
                'last_page' => $companies->lastPage(),
                'per_page' => $companies->perPage(),
            ],
        ]);
    }

    public function update(Request $request, Company $company)
    {
        $company->update($request->only('name', 'email', 'discount'));

        $company->address()->updateOrCreate(
            [],
            $request->only('country', 'postal_code', 'city', 'street')
        );

        return response()->json(['message' => 'Company updated successfully']);
    }

}
