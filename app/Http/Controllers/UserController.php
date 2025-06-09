<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserManagementRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getAllUsers(UserManagementRequest $request): JsonResponse
    {
        $perPage = $request->query('per_page', 10);
        $search = $request->query('search');
        $role = $request->query('role');

        $users = User::query()
            ->search($search)
            ->role($role)
            ->paginate($perPage);

        return response()->json([
            'message' => 'Users fetched successfully',
            'data' => UserResource::collection($users->items()),
            'pagination' => [
                'total' => $users->total(),
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
            ],
        ]);
    }

    public function update(Request $request, User $company)
    {
        $company->update($request->only('first_name', 'name', 'email'));

        $company->address()->updateOrCreate(
            [],
            $request->only('country', 'postal_code', 'city', 'street')
        );

        return response()->json(['message' => 'User updated successfully']);
    }

}
