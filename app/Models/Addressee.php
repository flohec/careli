<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Addressee extends Model
{
    protected $fillable = ['country', 'postal_code', 'city', 'street'];

    public function addressable()
    {
        return $this->morphTo();
    }
}
