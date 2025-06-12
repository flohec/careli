<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServerRackConfig extends Model
{
    protected $fillable = [
        'width',
        'height',
        'depth',
        'color',
        'has_door',
        'shelf_count',
        'total_price',
        'user_id', // Assuming you want to track which user created the config
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
