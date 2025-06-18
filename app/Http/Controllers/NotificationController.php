<?php

namespace App\Http\Controllers;

use App\Models\cliente;
use App\Models\detallePedido;
use App\Models\pedido;
use App\Notifications\NotificacionDePrueba;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Notification;

class NotificationController extends Controller
{
   public function sendNotification(Request $request)
{
    $data = $request->validate([
    'nombre' => 'nullable|string',
    'empresa' => 'nullable|string',
    'tipo_documento' => 'required|in:DNI,RUC',
    'numero_documento' => 'required|string|max:20',
    'email' => 'required|email',
    'telefono' => 'nullable|string|max:20',
    'comentario' => 'nullable|string',

    'largo' => 'required|numeric',
    'alto' => 'required|numeric',
    'tipoLed' => 'required|string',
    'tipo' => 'required|string',
    'areaM2' => 'required|numeric',
    'precioFinal' => 'required|numeric',
]);


    try{
         $cliente = cliente::firstOrCreate(
            ['numero_documento' => $data['numero_documento']],
            [
                'nombre' => $data['nombre'],
                'empresa' => $data['empresa'],
                'tipo_documento' => $data['tipo_documento'],
                'telefono' => $data['telefono'],
                'email' => $data['email'],
            ]
        );

         $pedido = pedido::create([
            'cliente_id' => $cliente->id_cliente,
            'fecha' => now(),
            'comentario' => $data['comentario'],
            'estado' => 'pendiente',
        ]);

         $detalle = detallePedido::create([
            'pedido_id' => $pedido->id_pedido,
            'producto_id' => null, // O asigna un producto si ya existe uno fijo
            'cantidad' => 1,
            'precio_unitario' => $data['precioFinal'],
            'subtotal' => $data['precioFinal'],
        ]);

    }catch(Exception $e){
        return response()->json([
            'success' => false,
            'message' => 'Ocurrió un error al procesar la solicitud.',
            'error' => $e->getMessage(),
        ], 500);

    }




    Notification::route('mail', $data['email'])
        ->notify(new NotificacionDePrueba($data, 'cliente'));

    Notification::route('mail', 'jledwar090@gmail.com')
        ->notify(new NotificacionDePrueba($data, 'admin'));

    Notification::route('mail', 'jlezamavictorio@gmail.com')
        ->notify(new NotificacionDePrueba($data, 'yo'));


    return response()->json(['success' => true]);
}



}
