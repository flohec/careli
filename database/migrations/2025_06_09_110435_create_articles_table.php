<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->string('filepath')->nullable();
            $table->string('base_price');
            $table->integer('quantity')->default(0);
            $table->integer('height')->default(0);
            $table->integer('width')->default(0);
            $table->integer('depth')->default(0);
            $table->integer('weight')->default(0);
            $table->foreignId('category_id')->constrained('article_categories')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
