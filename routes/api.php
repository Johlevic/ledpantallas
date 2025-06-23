<?php
use App\Http\Controllers\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\ClientePedidoController;
use App\Http\Controllers\Api\ListaProductosController;
use App\Http\Controllers\ClienteExportController;

use App\Models\Pedido;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/send-notification', [NotificationController::class, 'sendNotification']);


Route::apiResource('clientes', ClienteController::class);

Route::apiResource('clientes', ClientePedidoController::class);



Route::get('/export/clientes/{formato}', [ClienteExportController::class, 'export']);

Route::put('/pedidos/{pedido}/estado', function (Pedido $pedido, Request $request) {
    $request->validate([
        'estado' => 'required|in:pendiente,atendiendo,atendido',
    ]);

    $pedido->estado = $request->estado;
    $pedido->save();

    return response()->json(['success' => true]);
});

Route::apiResource('productos', ListaProductosController::class);
Route::get('/calculadora/productos', [ListaProductosController::class, 'paraCalculadora']);
