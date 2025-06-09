<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array with selected attributes.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'name' => $this->name,
            'full_name' => $this->full_name,
            'email' => $this->email,
            'role' => $this->role,
            'company' => $this->company,
            'country' => $this->address->country,
            'city' => $this->address->city,
            'street' => $this->address->street,
            'postal_code' => $this->address->postal_code,
        ];
    }
}
