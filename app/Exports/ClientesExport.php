<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Collection;

class ClientesExport implements FromCollection, WithHeadings
{
    protected $clientes;

    public function __construct(Collection $clientes)
    {
        $this->clientes = $clientes;
    }

    public function collection()
    {
        return $this->clientes->map(function ($cliente) {
            return [
                $cliente->id_cliente,
                $cliente->nombre,
                $cliente->empresa,
                $cliente->tipo_documento,
                $cliente->numero_documento,
                $cliente->telefono,
                $cliente->email,
            ];
        });
    }

    public function headings(): array
    {
        return ['ID', 'Nombre', 'Empresa', 'Tipo Doc', 'Nro Doc', 'Teléfono', 'Email'];
    }
}
