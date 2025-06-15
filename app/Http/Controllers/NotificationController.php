<?php

namespace App\Http\Controllers;
use App\Notifications\NotificacionDePrueba;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Notification;

class NotificationController extends Controller
{
   public function sendNotification(Request $request)
{
    $data = $request->validate([
        'nombre' => 'required|string',
        'email' => 'required|email',
        'telefono' => 'nullable|string',
        'empresa' => 'nullable|string',
        'comentario' => 'nullable|string',
        'largo' => 'required|numeric',
        'alto' => 'required|numeric',
        'tipoLed' => 'required|string',
        'tipo' => 'required|string',
        'areaM2' => 'required|numeric',
        'precioFinal' => 'required|numeric',
    ]);

    

    Notification::route('mail', $data['email'])
        ->notify(new NotificacionDePrueba($data, 'cliente'));

    Notification::route('mail', 'robert.rodriguezcastro@gmail.com')
        ->notify(new NotificacionDePrueba($data, 'admin'));

    Notification::route('mail', 'jlezamavictorio@gmail.com')
        ->notify(new NotificacionDePrueba($data, 'yo'));


    return response()->json(['success' => true]);
}


    
}
