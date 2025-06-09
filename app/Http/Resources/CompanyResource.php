<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'discount' => $this->discount,
            'country' => $this->address->country,
            'city' => $this->address->city,
            'street' => $this->address->street,
            'postal_code' => $this->address->postal_code,
        ];
    }
}
