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
        'precio_oferta',
        'precio_fijo',
    ];

    public function descripcion()
    {
        return $this->belongsTo(Descripcion::class, 'descripcion_id');
    }

    public function detallesPedidos()
    {
        return $this->hasMany(DetallePedido::class, 'producto_id');
    }
}
