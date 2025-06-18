<!DOCTYPE html>
<html lang="es">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Confirmación de Pedido - VISUALLED</title>


    <style>
        body {
            font-family: Arial, Helvetica, sans-serif !important;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
            color: #2d3748;
        }

        .container {


            border-radius: 12px;
            max-width: 100%;
            margin: auto;
        }

        /* Encabezado */
        .header {

            text-align: center;
            padding: 2px;
            background-color: #002F5F;
            color: white;
            border-radius: 0 0 0 0;

        }

        .logo {
            font-size: auto;
            font-weight: bold;
        }

        .tagline {
            font-style: italic;
            font-size: 1rem;
            opacity: 0.9;
        }

        /* Contenido */
        .content {
            text-align: center;
            padding: 5px;
        }

        .text-thanks {
            font-size: 15px;
            color: #002F5F;
            margin-bottom: 10px;
        }

        .text-message {
            font-size: 13px;
            margin-bottom: 5px;

        }

        .btn-primary {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(to right, #00A8FF, #002F5F);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
        }



        /* Detalles del pedido */
        .section-title {
            font-size: 1rem;
            color: #002F5F;
            text-align: center;
            margin-top: 5px;
        }

        .order-summary {
            width: 100%;
            border-collapse: collapse;
            margin-top: 5px;
            font-size: 14px;
        }

        .order-summary th,
        .order-summary td {
            border: 1px solid #ccc;
            padding: 12px;
            text-align: left;
        }

        .order-summary th {
            background-color: #f2f2f2;
        }

        .total-row {
            font-weight: bold;
            background-color: #f2f2f2;
        }

        /* Información del cliente */
        .client-info {
            display: table;
            width: 100%;
            margin-top: 20px;
            font-size: 14px;
        }

        .info-card {
            display: table-cell;
            width: 50%;
            padding: 15px;
            background-color: #F8FAFC;
            border-left: 3px solid #00A8FF;
            vertical-align: top;
            font-size: 14px;
        }

        .info-card h3 {
            font-size: 14px;
            color: #002F5F;
        }

        .info-card p {
            margin: 5px 0;
        }

        /* Contacto */
        .contact-section {
            background-color: #F8FAFC;
            padding: 20px;
            margin-top: 30px;
            text-align: center;
        }

        .contact-btn {
            display: inline-block;
            padding: 10px 20px;
            margin: 10px;
            border-radius: 50px;
            color: white;
            text-decoration: none;
            font-weight: bold;
        }

        .email-btn {
            background-color: #EDF2F7;
            color: #2D3748;
        }

        .whatsapp-btn {
            background-color: #25D366;
        }

        .phone-btn {
            background-color: #00A8FF;
        }

        /* Pie de página */
        .footer {
            background-color: #002F5F;
            color: white;
            padding: 10px;
            text-align: center;
            border-radius: 0 0 5% 5%;
        }

        .copyright {
            font-size: 0.8rem;
            opacity: 0.8;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Encabezado -->
        <div class="header">
            <h2 class="logo">VISUALLED</h2>
            <p class="tagline">Tecnología LED de vanguardia</p>
        </div>

        <!-- Contenido principal -->
        <div class="content">
            <img src="https://cdn-icons-png.flaticon.com/512/8358/8358886.png" alt="icono de check" width="80">
            <h2 class="text-thanks">¡Pedido Confirmado!</h2>
            <p class="text-message">
                @if ($tipo_documento === 'RUC')
                    <strong>¡Excelentes noticias, {{ $empresa }}!</strong><br>
                @else
                    <strong>¡Excelentes noticias, {{ $nombre }}!</strong><br>
                @endif
                Hemos recibido tu pedido #{{ $pedido_id ?? '001' }} y ya está siendo procesado.
            </p>
            <a href="#" class="btn-primary">Ver detalles del pedido</a>
        </div>





        <!-- Detalles del pedido -->
        <h2 class="section-title">Detalles de tu pedido</h2>
        <table class="order-summary">
            <tr>
                <th>Producto/Servicio</th>
                <th>Precio</th>
            </tr>
            <tr>
                <td>
                    <strong>Pantalla LED {{ strtoupper($tipoLed) }}</strong><br>
                    {{ ucfirst($tipo) }} | {{ $largo }}mm × {{ $alto }}mm
                    ({{ number_format($areaM2, 2) }} m²)
                </td>
                <td>${{ number_format($precioFinal, 2) }} USD</td>
            </tr>
            <tr class="total-row">
                <td>Total</td>
                <td>${{ number_format($precioFinal, 2) }} USD</td>
            </tr>
        </table>

        <!-- Información del cliente -->
        <div class="client-info">
            <div class="info-card">
                <h3>Información del cliente</h3>

                @if ($tipo_documento === 'RUC')
                    <p><strong>Empresa:</strong> {{ $empresa }}</p>
                    <p><strong>RUC:</strong> {{ $numero_documento }}</p>
                @else
                    <p><strong>Nombre:</strong> {{ $nombre }}</p>
                    <p><strong>DNI:</strong> {{ $numero_documento }}</p>
                @endif

                <p><strong>Email:</strong> {{ $email }}</p>

                @if (!empty($telefono))
                    <p><strong>Teléfono:</strong> {{ $telefono }}</p>
                @endif
            </div>

            <div class="info-card">
                <h3>Detalles adicionales</h3>
                <p><strong>N° Pedido:</strong> #{{ $pedido_id ?? '001' }}</p>
                <p><strong>Fecha:</strong> {{ date('d/m/Y') }}</p>
                <p><strong>Estado:</strong> En revisión</p>
                @if (isset($comentario))
                    <p><strong>Notas:</strong> {{ $comentario }}</p>
                @endif
            </div>
        </div>

        <!-- Sección de contacto -->
        <div class="contact-section">
            <h2 class="section-title">¿Necesitas ayuda con tu pedido?</h2>
            <p>Nuestro equipo está disponible para responder tus preguntas</p>
            <a href="mailto:robert.rodriguezcastro@gmail.com" class="contact-btn email-btn">Correo Electrónico</a>
            <a href="https://wa.me/+51948862421?text=Hola%20VISUALLED%2C%20estoy%20interesado%20en%20sus%20pantallas%20LED%20y%20quisiera%20más%20información."
                class="contact-btn whatsapp-btn" target="_blank" rel="noopener noreferrer">

                WhatsApp
            </a>
            <a href="tel:+51948862241" class="contact-btn phone-btn">Llamada Telefónica</a>
        </div>

        <!-- Pie de página -->
        <div class="footer">
            <div class="social-icons" style="margin-bottom:15px;">
                <a href="https://facebook.com/visualled">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg" width="16"
                        alt="Facebook">
                </a>
                <a href="https://instagram.com/visualled">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" width="16"
                        alt="Instagram">
                </a>
                <a href="https://twitter.com/visualled">
                    <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg" width="16"
                        alt="Twitter">
                </a>

            </div>
            <p class="copyright">
                © {{ date('Y') }} VISUALLED. Todos los derechos reservados.<br>
                Tecnología LED de vanguardia
            </p>
        </div>

    </div>
</body>

</html>
