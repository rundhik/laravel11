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
        Schema::create('microservices', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama service (Aplikasi B, C, D, dll.)
            $table->string('slug')->unique(); // Slug dari nama service (a, b, c, d, dll.)
            $table->string('base_url'); // URL base untuk microservice
            $table->string('token'); // Token API untuk komunikasi
            $table->json('methods')->nullable(); // Method yang diizinkan (GET, POST, dll.)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('microservices');
    }
};
