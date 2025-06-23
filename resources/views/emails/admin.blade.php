<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Presupuesto Solicitado</title>
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

        body {
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            padding: 30px 20px;
            color: white;
            text-align: center;
        }

        .logo {
            max-width: 180px;
            height: auto;
        }

        .content {
            padding: 30px;
        }

        h1 {
            color: #2c3e50;
            margin-top: 0;
            font-size: 24px;
        }

        .greeting {
            font-size: 18px;
            margin-bottom: 25px;
        }

        .details {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }

        .detail-item {
            margin-bottom: 12px;
            display: flex;
        }

        .detail-label {
            font-weight: 600;
            color: #6e8efb;
            min-width: 150px;
        }

        .footer {
            text-align: center;
            padding: 20px;
            background: #f5f7fa;
            color: #7f8c8d;
            font-size: 12px;
        }

        .social-links {
            margin: 15px 0;
        }

        .social-links a {
            margin: 0 10px;
            text-decoration: none;
        }

        .priority {
            background: #fff8e1;
            padding: 10px 15px;
            border-left: 4px solid #ffc107;
            margin: 20px 0;
        }

        .btn {
            display: inline-block;
            background: #6e8efb;
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 30px;
            font-weight: 500;
            margin-top: 15px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="https://previews.123rf.com/images/lumut/lumut1809/lumut180900116/107803129-tv-lcd-led-monitor-icon-vector-illustration-design-logo.jpg"
                alt="Logo Empresa" class="logo">
            <h1>Nueva Solicitud de Presupuesto</h1>
        </div>

        <div class="content">
            <!-- Saludo dinámico según hora del día -->
            <p class="greeting">
                @php
                    $hora = date('G');
                    if ($hora >= 5 && $hora < 12) {
                        echo 'Buenos días';
                    } elseif ($hora >= 12 && $hora < 19) {
                        echo 'Buenas tardes';
                    } else {
                        echo 'Buenas noches';
                    }
                @endphp
                , <strong>Robert Rodriguez</strong>
            </p>

            <p>Se ha recibido una nueva solicitud de presupuesto que requiere tu atención:</p>

            <div class="details">
                {{-- Muestra Nombre o Empresa --}}
                @if (($datos['tipo_documento'] ?? '') === 'RUC')
                    <div class="detail-item">
                        <span class="detail-label">Empresa:</span>
                        <span>{{ $datos['empresa'] ?? 'N/A' }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">RUC:</span>
                        <span>{{ $datos['numero_documento'] ?? 'N/A' }}</span>
                    </div>
                @else
                    <div class="detail-item">
                        <span class="detail-label">Cliente:</span>
                        <span>{{ $datos['nombre'] ?? 'N/A' }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">DNI:</span>
                        <span>{{ $datos['numero_documento'] ?? 'N/A' }}</span>
                    </div>
                @endif

                <div class="detail-item">
                    <span class="detail-label">Email:</span>
                    <span>{{ $datos['email'] ?? 'N/A' }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Teléfono:</span>
                    {{-- Solo muestra el teléfono si tiene un valor --}}
                    <span>{{ $datos['telefono'] ?? 'No especificado' }}</span>
                </div>

                {{-- Resto de los detalles del pedido, que siempre se muestran --}}
                <div class="detail-item">
                    <span class="detail-label">Dimensiones:</span>
                    <span>{{ $datos['largo'] ?? 'N/A' }} mm × {{ $datos['alto'] ?? 'N/A' }} mm</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Área:</span>
                    <span>{{ number_format($datos['areaM2'] ?? 0, 2) }} m²</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Tipo instalación:</span>
                    <span>{{ ucfirst($datos['tipo'] ?? 'N/A') }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Tipo de LED:</span>
                    <span>{{ strtoupper($datos['tipoLed'] ?? 'N/A') }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Precio estimado:</span>
                    <span>${{ number_format($datos['precioFinal'] ?? 0, 2) }} USD</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Comentarios:</span>
                    <span>{{ $datos['comentario'] ?? 'Sin comentarios' }}</span>
                </div>
            </div>

            <div class="priority">
                <strong>Prioridad:</strong> Por favor responder dentro de las próximas 24 horas.
            </div>

            <a href="https://tudominio.com/admin/presupuestos" class="btn">Ver solicitud completa</a>
        </div>

        <div class="footer">
            <div class="social-links">
                <a href="https://facebook.com/tuempresa" style="color: #3b5998;">Facebook</a>
                <a href="https://instagram.com/tuempresa" style="color: #e1306c;">Instagram</a>
                <a href="https://twitter.com/tuempresa" style="color: #1da1f2;">Twitter</a>
                <a href="https://linkedin.com/company/tuempresa" style="color: #0077b5;">LinkedIn</a>
            </div>
            <p>© {{ 'now' | date('Y') }} LED Solutions Pro. Todos los derechos reservados.</p>
            <p>Av. Principal 1234, Ciudad • Tel: +1 234 567 890</p>
            <p><small>Este es un mensaje automático, por favor no responda directamente.</small></p>
        </div>
    </div>
</body>

</html>
