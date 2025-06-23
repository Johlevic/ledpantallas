<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Nuevo Pedido - VISUALLED</title>
    <style>
        body {
            font-family: sans-serif;
            background-color: #f4f6f8;
            margin: 0;
            padding: 20px;
            color: #2d3748;
            font-size: 13px;
        }

        .collab-container {
            max-width: 680px;
            margin: 20px auto;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            border-collapse: collapse;
        }

        .collab-header {
            background: #002F5F;
            padding: 15px 20px;
            color: #fff;
        }

        .collab-header img {
            height: 30px;
            vertical-align: middle;
        }

        .collab-header h1 {
            font-size: 14px;
            margin: 0;
            font-weight: 600;
            display: inline-block;
            vertical-align: middle;
            margin-left: 10px;
        }

        .new-order-badge,
        .urgent-tag {
            font-size: 11px;
            font-weight: 600;
            padding: 2px 8px;
            border-radius: 12px;
            vertical-align: middle;
            color: #fff;
            display: inline-block;
            margin-left: 10px;
        }

        .new-order-badge {
            background: #00A8FF;
        }

        .urgent-tag {
            background: #e53e3e;
        }

        .collab-body {
            padding: 20px;
        }

        .greeting-section h2 {
            font-size: 13px;
            color: #2d3748;
            margin: 0 0 5px 0;
        }

        .order-summary {
            background: #f7fafc;
            border-left: 3px solid #00A8FF;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 15px;
        }

        .summary-item {
            margin-bottom: 6px;
        }

        .summary-label {
            color: #4a5568;
            display: inline-block;
            width: 120px;
        }

        .summary-value {
            font-weight: 600;
            color: #2d3748;
        }

        .price-display {
            text-align: center;
            background: #f0fff4;
            border: 1px dashed #48bb78;
            padding: 10px;
            border-radius: 6px;
            margin: 15px 0;
        }

        .price-label {
            font-size: 11px;
            color: #2f855a;
        }

        .price-amount {
            font-size: 20px;
            font-weight: 700;
            color: #2f855a;
        }

        .next-steps h3 {
            font-size: 12px;
            color: #4a5568;
            margin-bottom: 8px;
        }

        .steps-list {
            padding-left: 18px;
        }

        .steps-list li {
            margin-bottom: 5px;
        }

        .whatsapp-button {
            display: inline-block;
            background: #25D366;
            color: #fff;
            padding: 4px 10px;
            border-radius: 16px;
            font-size: 12px;
            text-decoration: none;
        }

        .collab-footer {
            background: #edf2f7;
            padding: 12px;
            text-align: center;
            font-size: 11px;
            color: #718096;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 10px;
        }

        th {
            background-color: #f2f2f2;
            text-align: left;
            width: 30%;
        }

        .comentario-box {
            background: #fefcbf;
            padding: 10px;
            border-radius: 4px;
            border-left: 3px solid #ecc94b;
            font-size: 12px;
            margin-bottom: 10px;
        }

        .timestamp {
            text-align: right;
            font-size: 10px;
            color: #a0aec0;
            margin-top: 10px;
        }
    </style>
</head>

<body>

    <div class="collab-container">

        <div class="collab-header">
            <img src="URL_DE_TU_LOGO" alt="Logo VISUALLED">
            <h1>VISUALLED Tecnología LED</h1>
            <span class="new-order-badge">POR PROCESAR</span>
            <span class="urgent-tag">ATENCIÓN</span>
        </div>

        <div class="collab-body">

            <div class="greeting-section">
                {{-- Saludo personalizado para el destinatario interno --}}
                @php
                    $hour = date('H'); // Obtiene la hora actual del servidor
                    $greeting = '';
                    if ($hour >= 5 && $hour < 12) {
                        $greeting = '¡Buenos días';
                    } elseif ($hour >= 12 && $hour < 19) {
                        $greeting = '¡Buenas tardes';
                    } else {
                        $greeting = '¡Buenas noches';
                    }
                @endphp
                <h2>{{ $greeting }} Jhony Lezama,</h2> {{-- Asumiendo que es para ti --}}
                <p>Se ha registrado un nuevo pedido en el sistema que requiere tu atención.</p>
            </div>

            <div class="order-summary">
                <div class="summary-item">
                    <span class="summary-label">Cliente:</span>
                    <span class="summary-value">
                        {{-- Mostrar empresa si es RUC, de lo contrario, nombre --}}
                        @if (($tipo_documento ?? '') === 'RUC')
                            {{ $empresa ?? 'N/A' }}
                        @else
                            {{ $nombre ?? 'N/A' }}
                        @endif
                    </span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Email:</span>
                    <span class="summary-value">{{ $email ?? 'N/A' }}</span> {{-- Agregado fallback --}}
                </div>
                <div class="summary-item">
                    <span class="summary-label">Teléfono:</span>
                    <span class="summary-value">
                        @if (isset($telefono) && $telefono)
                            {{-- Verifica si existe y no es vacío --}}
                            {{-- Eliminar el enlace de WhatsApp en el PDF, ya que no es interactivo --}}
                            {{ $telefono }}
                        @else
                            No especificado
                        @endif
                    </span>
                </div>
                {{-- Información de RUC/DNI si es necesario en este resumen --}}
                @if (($tipo_documento ?? '') === 'RUC')
                    <div class="summary-item">
                        <span class="summary-label">RUC:</span>
                        <span class="summary-value">{{ $numero_documento ?? 'N/A' }}</span>
                    </div>
                @else
                    <div class="summary-item">
                        <span class="summary-label">DNI:</span>
                        <span class="summary-value">{{ $numero_documento ?? 'N/A' }}</span>
                    </div>
                @endif
            </div>

            <table>
                <tr>
                    <th>Dimensión</th>
                    <td>{{ $largo ?? 'N/A' }} mm x {{ $alto ?? 'N/A' }} mm</td> {{-- Agregado fallback --}}
                </tr>
                <tr>
                    <th>Área</th>
                    <td>{{ number_format($areaM2 ?? 0, 2) }} m²</td> {{-- Agregado fallback --}}
                </tr>
                <tr>
                    <th>Instalación</th>
                    <td>{{ ucfirst($tipo ?? 'N/A') }}</td> {{-- Agregado fallback --}}
                </tr>
                <tr>
                    <th>Tecnología LED</th>
                    <td>{{ strtoupper($tipoLed ?? 'N/A') }}</td> {{-- Agregado fallback --}}
                </tr>
                <tr>
                    <th>Presupuesto Total</th>
                    <td style="font-weight: bold; color: #00A8FF;">${{ number_format($precioFinal ?? 0, 2) }} USD</td>
                    {{-- Agregado fallback --}}
                </tr>
            </table>

            <div class="price-display">
                <div class="price-label">VALOR ESTIMADO</div>
                <div class="price-amount">${{ number_format($precioFinal ?? 0, 2) }} USD</div> {{-- Agregado fallback --}}
            </div>

            <div class="comentario-box">
                <strong>Comentarios:</strong> {{ $comentario ?? 'El cliente no dejó comentarios adicionales' }}
            </div>

            <div class="next-steps">
                <h3>📋 Acciones requeridas</h3>
                <ul class="steps-list">
                    <li>Verificar materiales</li>
                    <li>Confirmar plazo producción</li>
                    <li>Actualizar estado</li>
                    <li>Notificar equipo comercial</li>
                </ul>
            </div>

            <div class="timestamp">
                Pedido registrado el {{ date('d/m/Y \a \l\a\s H:i') }}
            </div>

        </div>

        <div class="collab-footer">
            VISUALLED | Sistema de pedidos - {{ date('Y') }} {{-- Solo el año es más común en footers --}}
        </div>

    </div>

</body>

</html>
