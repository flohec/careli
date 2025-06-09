<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'name', 'description', 'filepath', 'thumbnail', 'base_price',
        'quantity', 'height', 'width', 'depth', 'weight', 'category_id'
    ];

    public function category()
    {
        return $this->belongsTo(ArticleCategory::class, 'category_id');
    }

    public function scopeSearch(Builder $query, $term)
    {
        if (!empty($term)) {
            $query->where(function ($q) use ($term) {
                $q->where('name', 'LIKE', "%{$term}%");
            });
        }
    }

    public function scopeCategory($query, $category)
    {
        if (!empty($category) && $category !== 'all') {
            $query->whereHas('category', function ($q) use ($category) {
                $q->where('slug', $category);
            });
        }
    }
}
