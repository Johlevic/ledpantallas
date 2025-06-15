<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotificacionDePrueba extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */

  

    public array $datos;
    public string $destinatario;


    public function __construct(array $datos , string $destinatario)
    {
        //
        $this->datos = $datos;
        $this->destinatario = $destinatario;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        if ($this->destinatario === 'cliente') {
            return (new MailMessage)
                ->subject('Gracias por tu solicitud de presupuesto')
                ->greeting('Hola ' . ($this->datos['nombre'] ?? 'Cliente') . ',')
                ->line('Hemos recibido tu solicitud de presupuesto con estos datos:')
                ->line('Dimensiones: ' . ($this->datos['largo'] ?? 'N/A') . ' mm x ' . ($this->datos['alto'] ?? 'N/A') . ' mm')
                ->line('Área: ' . number_format($this->datos['areaM2'] ?? 0, 2) . ' m²')
                ->line('Tipo de instalación: ' . ucfirst($this->datos['tipo'] ?? 'N/A'))
                ->line('Tipo de LED: ' . strtoupper($this->datos['tipoLed'] ?? 'N/A'))
                ->line('Precio estimado: $' . number_format($this->datos['precioFinal'] ?? 0, 2) . ' USD')
                ->line('Nos pondremos en contacto contigo pronto para seguir con tu proyecto.')
                ->salutation('¡Gracias por confiar en nosotros!');

        } elseif ($this->destinatario === 'admin') {
            return (new MailMessage)
                ->subject('Nueva solicitud de presupuesto recibida')
                ->greeting('Hola administrador,')
                ->line('Se ha recibido una nueva solicitud de presupuesto con los siguientes datos:')
                ->line('Cliente: ' . ($this->datos['nombre'] ?? 'N/A'))
                ->line('Email: ' . ($this->datos['email'] ?? 'N/A'))
                ->line('Teléfono: ' . ($this->datos['telefono'] ?? 'No especificado'))
                ->line('Empresa: ' . ($this->datos['empresa'] ?? 'No especificada'))
                ->line('Dimensiones: ' . ($this->datos['largo'] ?? 'N/A') . ' mm x ' . ($this->datos['alto'] ?? 'N/A') . ' mm')
                ->line('Área: ' . number_format($this->datos['areaM2'] ?? 0, 2) . ' m²')
                ->line('Tipo de instalación: ' . ucfirst($this->datos['tipo'] ?? 'N/A'))
                ->line('Tipo de LED: ' . strtoupper($this->datos['tipoLed'] ?? 'N/A'))
                ->line('Precio estimado: $' . number_format($this->datos['precioFinal'] ?? 0, 2) . ' USD')
                ->line('Comentario: ' . ($this->datos['comentario'] ?? 'Sin comentario'))
                ->salutation('Saludos,')
                ->line('Por favor revisa y procesa esta solicitud.');
        
        } elseif ($this->destinatario === 'yo') {
            return (new MailMessage)
                ->subject('Aviso: Nuevo pedido recibido')
                ->greeting('Hola,')
                ->line('Se ha registrado un nuevo pedido con estos datos:')
                ->line('Cliente: ' . ($this->datos['nombre'] ?? 'N/A'))
                ->line('Email: ' . ($this->datos['email'] ?? 'N/A'))
                ->line('Precio estimado: $' . number_format($this->datos['precioFinal'] ?? 0, 2) . ' USD')
                ->line('Por favor revisa la solicitud lo antes posible.')
                ->salutation('Saludos,');
        }

        // Por defecto, si no coincide el destinatario:
        return (new MailMessage)
            ->subject('Nueva notificación')
            ->line('Hay una nueva notificación.');
    }


    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
