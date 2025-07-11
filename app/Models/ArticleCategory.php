<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArticleCategory extends Model
{
    protected $table = 'article_categories';

    public function articles()
    {
        return $this->hasMany(Article::class, 'category_id');
    }

}
