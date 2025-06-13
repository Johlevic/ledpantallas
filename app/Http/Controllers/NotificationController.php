<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;

class NotificationController extends Controller
{
    public function sendNotification(Request $request)
    {
        // Validación básica
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

        // 1. Enviar correo a jlezamavictorio@gmail.com
        Mail::raw("Nuevo formulario recibido:\n\n" .
            "Nombre: {$data['nombre']}\n" .
            "Empresa: {$data['empresa']}\n" .
            "Email: {$data['email']}\n" .
            "Teléfono: {$data['telefono']}\n" .
            "Comentario: {$data['comentario']}\n\n" .
            "Detalles del proyecto:\n" .
            "Dimensiones: {$data['largo']}m x {$data['alto']}m\n" .
            "Área: {$data['areaM2']} m²\n" .
            "Tipo: {$data['tipo']}\n" .
            "LED: {$data['tipoLed']}\n" .
            "Precio final: \${$data['precioFinal']} USD", function ($message) {
            $message->to('jlezamavictorio@gmail.com')
                    ->subject('Nuevo presupuesto solicitado');
        });

        // 2. Enviar mensaje por WhatsApp
        $whatsappNumber = '+51980609176'; // Tu número de WhatsApp
        $mensaje = urlencode(
            "🔔 Nuevo presupuesto solicitado:\n\n" .
            "Cliente: {$data['nombre']}\n" .
            "Email: {$data['email']}\n" .
            "Teléfono: {$data['telefono']}\n" .
            "Empresa: {$data['empresa']}\n\n" .
            "Proyecto:\n" .
            "Área: {$data['areaM2']} m²\n" .
            "Tipo: {$data['tipo']}\n" .
            "LED: {$data['tipoLed']}\n" .
            "Precio: \${$data['precioFinal']} USD"
        );

        // Usamos una API de WhatsApp como por ejemplo:
        // - WhatsApp Business API (oficial)
        // - o una alternativa gratuita como https://wa.me  o servicios como WATI o Z-API
        // Aquí usamos un ejemplo simple con wa.me (no envía automáticamente, solo genera el link)

        // Opcional: usar una API real de WhatsApp si necesitas enviar mensajes automáticos
        // Ejemplo básico para abrir WhatsApp web:
        $url = "https://wa.me/{$whatsappNumber}?text={$mensaje}";

        // Si usas una API real de WhatsApp, harías algo como:
        // Http::post('https://api.whatsapp.service.com/send', [...]);

        return response()->json(['success' => true]);
    }
}
