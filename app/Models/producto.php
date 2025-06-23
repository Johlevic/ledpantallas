<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class producto extends Model
{
    use HasFactory;

    protected $table = 'productos';
    protected $primaryKey = 'id_producto';

     protected $fillable = [
        'nombre',
        'descripcion_id',
        'tipo',
        'tipo_instalacion',         // Nuevo
        'precio_por_m2',       // Nuevo
        'stock',               // Nuevo
        'es_predeterminado',   // Nuevo
        'precio_oferta',
        'precio_fijo',
    ];

    protected $casts = [
        'precio_fijo' => 'float',
        'precio_oferta' => 'float',
        'precio_por_m2' => 'float',       // Nuevo
        'stock' => 'integer',             // Nuevo
        'es_predeterminado' => 'boolean', // Nuevo
    ];

    public function descripcion()
    {
        return $this->belongsTo(Descripcion::class, 'descripcion_id');
    }

    public function detallesPedidos()
    {
        return $this->hasMany(DetallePedido::class, 'producto_id');
    }

    public function imagenes()
    {
        return $this->hasMany(imagenes::class, 'producto_id');
    }
}
