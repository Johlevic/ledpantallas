<?php

namespace App\Http\Controllers;

use App\Exports\ClientesExport;
use App\Models\cliente;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

class ClienteExportController extends Controller
{
    public function export($formato, Request $request)
    {
        $filtro = $request->query('filtro');
        $busqueda = $request->query('busqueda');

        $query = cliente::query();

        if ($filtro === 'clientes') {
            $query->where('tipo_documento', 'DNI');
        } elseif ($filtro === 'empresas') {
            $query->where('tipo_documento', 'RUC');
        }

        if ($busqueda) {
            $query->where(function ($q) use ($busqueda) {
                $q->where('nombre', 'like', "%{$busqueda}%")
                  ->orWhere('empresa', 'like', "%{$busqueda}%");
            });
        }

        $clientes = $query->get();

        $export = new ClientesExport($clientes);
        $fileName = 'clientes_' . now()->format('Ymd_His');

        switch ($formato) {
            case 'excel':
                return Excel::download($export, 'clientes.xlsx');
            case 'csv':
                return Excel::download($export, 'clientes.csv', \Maatwebsite\Excel\Excel::CSV);
           case 'pdf':
                return Pdf::loadView('exports.clientes', compact('clientes'))
                      ->setPaper('a4', 'landscape')
                      ->download("$fileName.pdf");
            default:
                return response()->json(['error' => 'Formato no soportado'], 400);
        }
    }
}
