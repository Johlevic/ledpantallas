<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return cliente::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'nullable|string|max:100',
            'empresa' => 'nullable|string|max:100',
            'tipo_documento' => 'required|string|max:3',
            'numero_documento' => 'required|string|max:20|unique:clientes,numero_documento',
            'telefono' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
        ]);

        return Cliente::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cliente $cliente)
    {
        return $cliente;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cliente $cliente)
    {
        $data = $request->validate([
            'nombre' => 'nullable|string|max:100',
            'empresa' => 'nullable|string|max:100',
            'tipo_documento' => 'required|string|max:3',
            'numero_documento' => 'required|string|max:20|unique:clientes,numero_documento,' . $cliente->id_cliente . ',id_cliente',
            'telefono' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
        ]);

        $cliente->update($data);

        return $cliente;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cliente $cliente)
    {
         $cliente->delete();

        return response()->json(['message' => 'Cliente eliminado']);
    }
}
