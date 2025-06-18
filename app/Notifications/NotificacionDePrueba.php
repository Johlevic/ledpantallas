<?php

namespace App\Notifications;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Str;

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
   public function toMail(object $notifiable)
{
    $asunto = 'Solicitud de presupuesto LED';

    switch ($this->destinatario) {
        case 'cliente':
            $vistaCorreo = 'emails.cliente';
            $vistaPdf = 'pdf.presupuesto_cliente';
            break;
        case 'admin':
            $vistaCorreo = 'emails.admin';
            $vistaPdf = 'pdf.presupuesto_admin';
            break;
        case 'yo':
            $vistaCorreo = 'emails.col';
            $vistaPdf = 'pdf.presupuesto_col';
            break;
        default:
            $vistaCorreo = 'emails.cliente';
            $vistaPdf = 'pdf.presupuesto_cliente';
            break;
    }

    $pdf = Pdf::loadView($vistaPdf, $this->datos);
    $pdfName = 'Presupuesto-' . Str::slug($this->datos['nombre'] ?? 'cliente') . '-' . $this->destinatario . '.pdf';
    $tempPath = storage_path("app/{$pdfName}");
    $pdf->save($tempPath);

    return (new \Illuminate\Notifications\Messages\MailMessage)
        ->subject($asunto)
        ->view($vistaCorreo, ['datos' => $this->datos])
        ->attach($tempPath, [
            'as' => $pdfName,
            'mime' => 'application/pdf',
        ]);
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
