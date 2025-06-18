<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Nuevo Pedido Registrado! - Acción Requerida</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap'); /* Fuente moderna y legible */

        body {
            font-family: 'Montserrat', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #eef2f6; /* Fondo gris muy suave */
            color: #333333;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .email-container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08); /* Sombra más pronunciada pero elegante */
            overflow: hidden;
            border: 1px solid #e0e0e0;
        }
        .header {
            background-color: #4CAF50; /* Verde vibrante para el éxito/nuevo pedido */
            color: #ffffff;
            padding: 30px 25px;
            text-align: center;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            line-height: 1.2;
        }
        .header p {
            margin: 5px 0 0;
            font-size: 16px;
            font-weight: 400;
            opacity: 0.9;
        }
        .content {
            padding: 25px 35px;
            line-height: 1.7;
        }
        .greeting {
            font-size: 22px;
            font-weight: 600;
            color: #2196F3; /* Azul para el saludo */
            margin-bottom: 25px;
            text-align: left;
        }
        .order-summary {
            background-color: #f7f9fc; /* Fondo claro para los detalles */
            border-left: 6px solid #4CAF50; /* Barra lateral del color primario */
            padding: 20px 25px;
            margin: 25px 0;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* Sombra suave para el bloque de detalles */
        }
        .order-summary ul {
            list-style: none; /* Quitar viñetas predeterminadas */
            padding: 0;
            margin: 0;
        }
        .order-summary li {
            margin-bottom: 10px;
            font-size: 16px;
            color: #555555;
            display: flex; /* Para alinear etiquetas y valores */
            align-items: baseline;
        }
        .order-summary li:last-child {
            margin-bottom: 0;
        }
        .order-summary strong {
            color: #333333;
            font-weight: 600;
            flex-shrink: 0; /* Evita que la etiqueta se encoja */
            width: 120px; /* Ancho fijo para las etiquetas */
            text-align: right;
            padding-right: 15px;
        }
        .action-button-container {
            text-align: center;
            padding: 15px 35px 30px;
        }
        .action-button {
            display: inline-block;
            background-color: #FFC107; /* Amarillo para el botón de acción, llama la atención */
            color: #333333; /* Texto oscuro para el botón amarillo */
            padding: 15px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 700;
            font-size: 18px;
            transition: background-color 0.3s ease, transform 0.2s ease;
            box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
        }
        .action-button:hover {
            background-color: #E0A800; /* Amarillo más oscuro al pasar el mouse */
            transform: translateY(-2px); /* Pequeño efecto al pasar el mouse */
        }
        .footer {
            text-align: center;
            padding: 20px 25px;
            font-size: 13px;
            color: #999999;
            background-color: #f0f4f8;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
        }
        .footer a {
            color: #2196F3;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>¡Pedido Nuevo en la Mira!</h1>
            <p>Se ha registrado una nueva solicitud que requiere tu atención.</p>
        </div>
        <div class="content">
            <p class="greeting" id="personalized-greeting"></p>

            <p style="font-size: 17px; margin-bottom: 25px;">Hola **Jhony Lezama**, tienes un **nuevo pedido** listo para ser revisado y gestionado. ¡Manos a la obra!</p>

            <div class="order-summary">
                <p style="font-size: 18px; font-weight: 600; color: #4CAF50; margin-top: 0;">Detalles del Pedido:</p>
                <ul>
                    <li><strong>Cliente:</strong> {{ $datos['nombre'] ?? 'N/A' }}</li>
                    <li><strong>Email:</strong> {{ $datos['email'] ?? 'N/A' }}</li>
                    <li><strong>Precio estimado:</strong> ${{ number_format($datos['precioFinal'] ?? 0, 2) }} USD</li>
                </ul>
            </div>

            <p style="font-size: 16px;">Por favor, revisa esta información con prontitud para asegurar un excelente servicio al cliente.</p>
        </div>
        <div class="action-button-container">
            <a href="TU_ENLACE_A_LA_PLATAFORMA_DE_PEDIDOS" class="action-button" target="_blank">Revisar Pedido Completo</a>
        </div>
        <div class="footer">
            <p>Este es un mensaje generado automáticamente. Por favor, no respondas a este correo.</p>
            <p>&copy; 2025 Tu Empresa. Todos los derechos reservados.</p>
            <p><a href="URL_DE_POLITICA_DE_PRIVACIDAD" target="_blank">Política de Privacidad</a> | <a href="URL_DE_TERMINOS_Y_CONDICIONES" target="_blank">Términos y Condiciones</a></p>
        </div>
    </div>

    <script>
        // Script para el saludo personalizado - ESTO SE DEBE GENERAR EN EL SERVIDOR.
        // Este JS es solo ilustrativo para la visualización en el navegador.
        document.addEventListener('DOMContentLoaded', function() {
            const now = new Date();
            const hour = now.getHours();
            let greeting = 'Hola';

            if (hour >= 5 && hour < 12) {
                greeting = '¡Buenos días';
            } else if (hour >= 12 && hour < 19) {
                greeting = '¡Buenas tardes';
            } else {
                greeting = '¡Buenas noches';
            }

            document.getElementById('personalized-greeting').textContent = greeting + '!';
        });
    </script>
</body>
</html>
