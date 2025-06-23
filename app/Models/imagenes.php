<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class imagenes extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_imagen';

    protected $fillable = [
        'producto_id',
        'url', // o 'ruta' según cómo lo hayas llamado
    ];

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
