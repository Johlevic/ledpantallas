<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class descripcion extends Model
{
    use HasFactory;

    protected $table = 'descripcions';
    protected $primaryKey = 'id_descripcion';

    protected $fillable = [
        'detalle',
        'modelo',
        'largo_mm',
        'alto_mm',
        'proteccion_ambiental',
        'tipo_led',
        'montaje',
        'instalacion',
        'resistencia_temperatura_min',
        'resistencia_temperatura_max',
        'procesador_imagen',
        'contraste',
        'tasa_refresco',
        'luminosidad_brillo',
        'propiedades_led',
        'comportamiento_humedad_min',
        'comportamiento_humedad_max',
        'angulo_vision_horizontal',
        'angulo_vision_vertical',
        'marca_blanca',
        'calibracion_cromatica',
        'reproductor_video',
        'configuracion',
    ];
}
