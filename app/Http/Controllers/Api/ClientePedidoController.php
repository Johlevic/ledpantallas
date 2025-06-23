<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\cliente;
use Illuminate\Http\Request;

class ClientePedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $clientes = Cliente::with('pedidos.detalles.producto')->get();
        return response()->json($clientes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $clientes = cliente::with('pedidos.detalles.producto')->get();
        return response()->json($clientes);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
