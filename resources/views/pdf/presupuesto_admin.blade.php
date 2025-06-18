<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Solicitud de Presupuesto - VISUALLED</title>
    <style>
        body {
            font-family: Arial, sans-serif; /* Fuente segura para Dompdf */
            font-size: 13px; /* Tamaño de fuente óptimo para PDFs */
            color: #333333;
            margin: 0 auto;
            max-width: 750px; /* Un poco más de ancho para contenido */
            background-color: #f7f9fc; /* Fondo gris claro */
        }

        .container {
            background-color: #ffffff;
            padding: 5px;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
            /* box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); */ /* Comentado por posible inconsistencia */
            overflow: hidden; /* Para contener floats */
        }

        /* Header */
        .header {
            text-align: center;
            border-bottom: 2px solid #00A8FF; /* Línea inferior distintiva */
            padding-bottom: 20px;
            margin-bottom: 25px;
            position: relative;
        }

        .header img.logo {
            width: 70px; /* Logo más grande */
            height: auto;
            display: block; /* Asegura que ocupe su propia línea */
            margin: 0 auto 10px auto; /* Centrar y dar espacio */
        }

        .header h1 {
            margin: 10px 0 5px 0;
            font-size: 24px; /* Título principal */
            color: #002F5F; /* Azul oscuro corporativo */
            font-weight: bold;
        }

        .header .badge {
            background: #00A8FF;
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 11px;
            display: inline-block; /* Compatible */
            margin-bottom: 8px;
        }

        .header p {
            margin: 5px 0;
            font-size: 12px;
            color: #666666;
        }

        .header .request-id {
            font-weight: bold;
            color: #002F5F;
        }

        /* Section Title (for Client Info & Comments) */
        .section-title {
            font-size: 16px; /* Títulos de sección */
            color: #002F5F;
            margin-top: 25px;
            margin-bottom: 10px;
            font-weight: bold;
            border-bottom: 1px solid #eeeeee;
            padding-bottom: 5px;
        }

        /* Client Info Table */
        .client-info-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            background-color: #fcfcfc;
            border: 1px solid #e0e0e0; /* Borde para la tabla de cliente */
            border-radius: 6px;
            overflow: hidden; /* Intento para que border-radius funcione en tablas */
        }

        .client-info-table th,
        .client-info-table td {
            padding: 10px 15px;
            text-align: left;
            border-bottom: 1px solid #eeeeee;
        }

        .client-info-table th {
            background-color: #f5f5f5;
            font-weight: bold;
            color: #555555;
            width: 100px; /* Ancho fijo para etiquetas */
        }
        .client-info-table tr:last-child th,
        .client-info-table tr:last-child td {
            border-bottom: none; /* Sin borde en la última fila */
        }


        /* Details Table */
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            overflow: hidden;
        }

        .details-table th,
        .details-table td {
            padding: 10px 15px;
            text-align: left;
            border-bottom: 1px solid #eeeeee;
        }

        .details-table th {
            background-color: #f5f5f5;
            font-weight: bold;
            color: #555555;
            width: 30%; /* Ancho para las etiquetas */
        }
        .details-table tr:last-child th,
        .details-table tr:last-child td {
            border-bottom: none;
        }
        .details-table .price-row th,
        .details-table .price-row td {
            font-size: 15px; /* Precio más grande en la tabla */
            font-weight: bold;
            color: #002F5F;
            background-color: #e6f7ff; /* Fondo para la fila de precio */
        }

        /* Comments */
        .comments-section {
            margin-top: 25px;
            background-color: #fffacd; /* Amarillo pastel */
            border-left: 4px solid #f0ad4e; /* Borde lateral naranja */
            padding: 15px;
            border-radius: 6px;
            font-size: 13px;
        }

        .comments-section strong {
            color: #a07d00; /* Color más oscuro para el título de comentarios */
        }

        /* WhatsApp Button */
        .whatsapp-button-container {
            text-align: center;
            margin: 10px 0;
        }

        .whatsapp-button {
            display: inline-block;
            background-color: #25D366; /* Verde WhatsApp */
            color: white;
            padding: 12px 22px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 15px; /* Botón más prominente */
            line-height: 1; /* Asegura que el texto y la imagen se alineen */
            vertical-align: middle; /* Para alinear el texto con el icono si se agrega */
        }
        .whatsapp-button img {
            width: 18px; /* Tamaño del icono */
            height: 18px;
            vertical-align: middle; /* Alineación del icono */
            margin-right: 8px; /* Espacio entre icono y texto */
        }


        /* Footer */
        .footer {
            text-align: center;
            font-size: 11px;
            margin-top: 35px;
            color: #666666;
            border-top: 1px solid #dddddd;
            padding-top: 10px;
        }

        .footer p {
            margin: 4px 0;
        }



        .footer .social-links a {
            color: #002F5F; /* Color corporativo para enlaces */
            text-decoration: none;
            margin: 0 10px;
            display: inline-block;
            vertical-align: middle;
            font-size: 12px;
            line-height: 1;
        }
        .footer .social-links a img {
            width: 16px; /* Tamaño de los iconos de redes sociales */
            height: 16px;
            vertical-align: middle;
            margin-right: 5px;
        }
    </style>
</head>
<body>

<div class="container">

    <div class="header">
        <img class="logo" src="https://i.imgur.com/your-visualled-logo.png" alt="Logo VISUALLED" /> <h1>Solicitud de Presupuesto</h1>
        <div class="badge">NUEVO PEDIDO</div> <p>
            <span class="request-id">ID: {{ $idPedido ?? 'No Asignado' }}</span> | Generado: {{ date('d/m/Y \a \l\a\s H:i', strtotime($fechaGeneracion ?? 'now')) }}
        </p>
    </div>

    <div class="client-info-section">
        <h3 class="section-title">Datos del Cliente</h3>
        <table class="client-info-table">
            <tbody>
                <tr>
                    <th>Nombre:</th>
                    <td>{{ $nombre ?? 'N/A' }}</td>
                </tr>
                <tr>
                    <th>Email:</th>
                    <td>{{ $email ?? 'N/A' }}</td>
                </tr>
                @if(isset($telefono) && $telefono)
                <tr>
                    <th>Teléfono:</th>
                    <td>{{ $telefono }}</td>
                </tr>
                @endif
                @if(isset($empresa) && $empresa)
                <tr>
                    <th>Empresa:</th>
                    <td>{{ $empresa }}</td>
                </tr>
                @endif
            </tbody>
        </table>
    </div>

    <div class="details-section">
        <h3 class="section-title">Detalles de la Solicitud</h3>
        <table class="details-table">
            <tbody>
                <tr>
                    <th>Dimensión:</th>
                    <td>{{ $largo ?? 'N/A' }} mm x {{ $alto ?? 'N/A' }} mm</td>
                </tr>
                <tr>
                    <th>Área:</th>
                    <td>{{ number_format($areaM2 ?? 0, 2) }} m²</td>
                </tr>
                <tr>
                    <th>Tipo de Instalación:</th>
                    <td>{{ ucfirst($tipo ?? 'N/A') }}</td>
                </tr>
                <tr>
                    <th>Tecnología LED:</th>
                    <td>{{ strtoupper($tipoLed ?? 'N/A') }}</td>
                </tr>
                <tr class="price-row">
                    <th>Presupuesto Estimado:</th>
                    <td>${{ number_format($precioFinal ?? 0, 2) }} USD</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="comments-section">
        <strong>Comentarios del Cliente:</strong><br>
        <p style="margin: 5px 0;">{{ $comentario ?? 'El cliente no dejó comentarios adicionales.' }}</p>
    </div>

    <div class="whatsapp-button-container">
        <a href="https://wa.me/{{ $telefono ?? '' }}?text=Hola%20{{ urlencode(explode(' ', $nombre)[0] ?? 'cliente') }},%20soy%20del%20equipo%20VISUALLED,%20estamos%20revisando%20tu%20solicitud%20de%20presupuesto."
           class="whatsapp-button" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/100px-WhatsApp.svg.png" alt="WhatsApp Icon" /> Contactar por WhatsApp
        </a>
    </div>

    <div class="footer">
        <p><strong>Este presupuesto es solo una estimación y es válido por 15 días.</strong></p>
        <p>&copy; {{ date('Y') }} VisualLED - Moche, Trujillo, Perú</p>
        <p>www.visualled.com | Tel: +51 911 123 4567</p>


    </div>

</div>

</body>
</html>
