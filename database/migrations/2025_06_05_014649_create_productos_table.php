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
        Schema::create('productos', function (Blueprint $table) {
            $table->id('id_producto');
            $table->string('nombre', 100);
            $table->unsignedBigInteger('descripcion_id')->nullable();
            $table->string('tipo', 50);
            $table->decimal('precio_oferta', 10, 2)->nullable();
            $table->decimal('precio_fijo', 10, 2);
            $table->timestamps();

            $table->foreign('descripcion_id')->references('id_descripcion')->on('descripcions')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
