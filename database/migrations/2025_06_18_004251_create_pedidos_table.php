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
        Schema::create('pedidos', function (Blueprint $table) {
              $table->id('id_pedido');
            $table->unsignedBigInteger('cliente_id');
            $table->date('fecha');
            $table->text('comentario')->nullable(); // lo puedes usar como mensaje también
            $table->string('estado', 50)->default('pendiente'); // pendiente, confirmado, entregado, etc.
            $table->string('archivo_pdf', 255)->nullable(); // ruta del PDF generado
            $table->timestamps();

            $table->foreign('cliente_id')->references('id_cliente')->on('clientes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
