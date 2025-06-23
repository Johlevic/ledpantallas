<?php

namespace App\Http\Controllers;

use App\Models\producto;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class productoPDFController extends Controller
{
    public function exportarPDF($id)
{
    $producto = Producto::with(['imagenes', 'descripcion'])->findOrFail($id);

    $pdf = Pdf::loadView('pdf.producto', compact('producto'));

    return $pdf->download("producto_{$id}.pdf"); // o ->stream() si lo prefieres
}
}
