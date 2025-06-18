<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Presupuesto Cliente</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7;">

    <!-- Contenedor principal -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto;">
        <tr>
            <td style="padding: 40px 20px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); text-align: center;">

                <!-- Logo -->
                <img src="https://previews.123rf.com/images/lumut/lumut1809/lumut180900116/107803129-tv-lcd-led-monitor-icon-vector-illustration-design-logo.jpg"  alt="Logo Tu Empresa" width="120" style="margin-bottom: 20px;">

                <!-- Título -->
                <h2 style="color: #2a3ab5; margin-bottom: 10px;">
                    @php
                        $hora = date('G');
                        if ($hora >= 5 && $hora < 12) {
                            echo 'Buenos días';
                        } elseif ($hora >= 12 && $hora < 19) {
                            echo 'Buenas tardes';
                        } else {
                            echo 'Buenas noches';
                        }
                    @endphp,
                    {{ $datos['nombre'] ?? 'Cliente' }}
                </h2>
                <p style="color: #555555; font-size: 16px; line-height: 1.5;">
                    Gracias por tu interés en nuestras soluciones LED profesionales.
                </p>

                <!-- Resumen del presupuesto -->
                <div style="margin-top: 25px; border-top: 1px solid #eee; padding-top: 20px;"></div>

                <p style="color: #333333; font-size: 16px; font-weight: bold;">
                    Aquí tienes tu presupuesto estimado:
                </p>

                <!-- Lista de detalles -->
                <ul style="text-align: left; padding-left: 20px; color: #333333; font-size: 15px; list-style: none; margin: 0; padding: 0;">
                    <li style="margin-bottom: 8px;"><strong>📏 Dimensiones:</strong> {{ $datos['largo'] ?? 'N/A' }} mm x {{ $datos['alto'] ?? 'N/A' }} mm</li>
                    <li style="margin-bottom: 8px;"><strong>📐 Área:</strong> {{ number_format($datos['areaM2'] ?? 0, 2) }} m²</li>
                    <li style="margin-bottom: 8px;"><strong>🛠️ Instalación:</strong> {{ ucfirst($datos['tipo'] ?? 'N/A') }}</li>
                    <li style="margin-bottom: 8px;"><strong>💡 Tipo de LED:</strong> {{ strtoupper($datos['tipoLed'] ?? 'N/A') }}</li>
                    <li style="margin-bottom: 8px;"><strong>💰 Precio estimado:</strong> ${{ number_format($datos['precioFinal'] ?? 0, 2) }} USD</li>
                </ul>

                <!-- Contexto adicional -->
                <p style="color: #555555; font-size: 15px; margin-top: 20px; line-height: 1.5;">
                    Este presupuesto incluye materiales, mano de obra e instalación profesional. Ofrecemos garantía de 2 años en todos nuestros trabajos.
                </p>

                <!-- Botón de acción -->
                <div style="margin-top: 30px;">
                    <a href="https://tuempresa.com/reservar-llamada"  style="background-color: #2a3ab5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                        Agenda tu llamada gratuita
                    </a>
                </div>

                <!-- Cierre -->
                <p style="color: #2a3ab5; font-weight: bold; margin-top: 25px; font-size: 16px;">
                    ¡Gracias por considerarnos para tu proyecto!
                </p>

            </td>
        </tr>
    </table>

    <!-- Pie de página -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto;">
        <tr>
            <td style="text-align: center; font-size: 13px; color: #999999; padding: 10px; border-top: 1px solid #eee;">
                © {{ date('Y') }} Tu Empresa S.A.<br>
                Av. Principal 123, Ciudad<br>
                <a href="https://tuempresa.com"  style="color: #2a3ab5; text-decoration: underline;">Visita nuestro sitio</a> |
                <a href="mailto:info@tuempresa.com" style="color: #2a3ab5; text-decoration: underline;">Email</a>
            </td>
        </tr>
    </table>

</body>
</html>
