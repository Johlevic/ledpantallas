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
        Schema::create('descripcions', function (Blueprint $table) {
            $table->id('id_descripcion');
            $table->text('detalle')->nullable();
            $table->string('modelo', 50)->nullable();
            $table->integer('largo_mm')->nullable();
            $table->integer('alto_mm')->nullable();
            $table->string('proteccion_ambiental', 100)->nullable();
            $table->string('tipo_led', 50)->nullable();
            $table->string('montaje', 255)->nullable();
            $table->string('instalacion', 255)->nullable();
            $table->integer('resistencia_temperatura_min')->nullable();
            $table->integer('resistencia_temperatura_max')->nullable();
            $table->string('procesador_imagen', 255)->nullable();
            $table->integer('contraste')->nullable();
            $table->integer('tasa_refresco')->nullable();
            $table->string('luminosidad_brillo', 100)->nullable();
            $table->text('propiedades_led')->nullable();
            $table->integer('comportamiento_humedad_min')->nullable();
            $table->integer('comportamiento_humedad_max')->nullable();
            $table->integer('angulo_vision_horizontal')->nullable();
            $table->integer('angulo_vision_vertical')->nullable();
            $table->boolean('marca_blanca')->default(false);
            $table->string('calibracion_cromatica', 255)->nullable();
            $table->string('reproductor_video', 255)->nullable();
            $table->string('configuracion', 100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('descripcions');
    }
};
