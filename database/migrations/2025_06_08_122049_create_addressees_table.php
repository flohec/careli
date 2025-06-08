<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('addressees', function (Blueprint $table) {
            $table->id();

            $table->string('country');
            $table->string('postal_code');
            $table->string('city');
            $table->string('street');

            $table->morphs('addressable');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('addressees');
    }
};

