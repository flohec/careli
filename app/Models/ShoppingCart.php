<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShoppingCart extends Model
{
    protected $table = 'shopping_cart';
    protected $fillable = [
        'user_id',
        'cartable_id',
        'cartable_type',
        'quantity',
    ];
    public function cartable()
    {
        return $this->morphTo();
    }
}
