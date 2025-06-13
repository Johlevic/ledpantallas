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
        Schema::create('notificacions', function (Blueprint $table) {
            $table->id('id_notificacion');
            $table->unsignedBigInteger('cliente_id');
            $table->text('mensaje');
            $table->string('archivo', 255)->nullable();
            $table->timestamps();

            $table->foreign('cliente_id')->references('id_cliente')->on('clientes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notificacions');
    }
};
