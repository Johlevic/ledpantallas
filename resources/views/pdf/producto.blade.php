<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ficha técnica - {{ $producto->nombre }}</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 13px;
            color: #333;
            line-height: 1.5;
        }
        h1, h2 {
            color: #1a202c;
            margin-bottom: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        th, td {
            border: 1px solid #ccc;
            padding: 6px 10px;
            text-align: left;
        }
        th {
            background-color: #f0f0f0;
        }
        .seccion {
            margin-top: 25px;
        }
    </style>
</head>
<body>
    <h1>Ficha Técnica del Producto</h1>

    <div class="seccion">
        <h2>Información General</h2>
        <table>
            <tr><th>Nombre</th><td>{{ $producto->nombre }}</td></tr>
            <tr><th>Tipo</th><td>{{ $producto->tipo }}</td></tr>
            <tr><th>Precio Fijo</th><td>S/ {{ number_format($producto->precio_fijo, 2) }}</td></tr>
            @if($producto->precio_oferta)
                <tr><th>Precio Oferta</th><td>S/ {{ number_format($producto->precio_oferta, 2) }}</td></tr>
            @endif
        </table>
    </div>

    @if($producto->descripcion)
    <div class="seccion">
        <h2>Descripción Técnica</h2>
        <table>
            @php $desc = $producto->descripcion; @endphp
            @if($desc->detalle)<tr><th>Detalle</th><td>{{ $desc->detalle }}</td></tr>@endif
            @if($desc->modelo)<tr><th>Modelo</th><td>{{ $desc->modelo }}</td></tr>@endif
            @if($desc->largo_mm)<tr><th>Largo</th><td>{{ $desc->largo_mm }} mm</td></tr>@endif
            @if($desc->alto_mm)<tr><th>Alto</th><td>{{ $desc->alto_mm }} mm</td></tr>@endif
            @if($desc->proteccion_ambiental)<tr><th>Protección Ambiental</th><td>{{ $desc->proteccion_ambiental }}</td></tr>@endif
            @if($desc->tipo_led)<tr><th>Tipo LED</th><td>{{ $desc->tipo_led }}</td></tr>@endif
            @if($desc->montaje)<tr><th>Montaje</th><td>{{ $desc->montaje }}</td></tr>@endif
            @if($desc->instalacion)<tr><th>Instalación</th><td>{{ $desc->instalacion }}</td></tr>@endif
            @if($desc->resistencia_temperatura_min)<tr><th>Temp. Mínima</th><td>{{ $desc->resistencia_temperatura_min }} °C</td></tr>@endif
            @if($desc->resistencia_temperatura_max)<tr><th>Temp. Máxima</th><td>{{ $desc->resistencia_temperatura_max }} °C</td></tr>@endif
            @if($desc->procesador_imagen)<tr><th>Procesador de Imagen</th><td>{{ $desc->procesador_imagen }}</td></tr>@endif
            @if($desc->contraste)<tr><th>Contraste</th><td>{{ $desc->contraste }}</td></tr>@endif
            @if($desc->tasa_refresco)<tr><th>Tasa de Refresco</th><td>{{ $desc->tasa_refresco }} Hz</td></tr>@endif
            @if($desc->luminosidad_brillo)<tr><th>Brillo</th><td>{{ $desc->luminosidad_brillo }}</td></tr>@endif
            @if($desc->propiedades_led)<tr><th>Propiedades LED</th><td>{{ $desc->propiedades_led }}</td></tr>@endif
            @if($desc->comportamiento_humedad_min)<tr><th>Humedad Mínima</th><td>{{ $desc->comportamiento_humedad_min }}%</td></tr>@endif
            @if($desc->comportamiento_humedad_max)<tr><th>Humedad Máxima</th><td>{{ $desc->comportamiento_humedad_max }}%</td></tr>@endif
            @if($desc->angulo_vision_horizontal)<tr><th>Ángulo Horizontal</th><td>{{ $desc->angulo_vision_horizontal }}°</td></tr>@endif
            @if($desc->angulo_vision_vertical)<tr><th>Ángulo Vertical</th><td>{{ $desc->angulo_vision_vertical }}°</td></tr>@endif
            @if(!is_null($desc->marca_blanca))<tr><th>Marca Blanca</th><td>{{ $desc->marca_blanca ? 'Sí' : 'No' }}</td></tr>@endif
            @if($desc->calibracion_cromatica)<tr><th>Calibración Cromática</th><td>{{ $desc->calibracion_cromatica }}</td></tr>@endif
            @if($desc->reproductor_video)<tr><th>Reproductor de Video</th><td>{{ $desc->reproductor_video }}</td></tr>@endif
            @if($desc->configuracion)<tr><th>Configuración</th><td>{{ $desc->configuracion }}</td></tr>@endif
        </table>
    </div>
    @endif
</body>
</html>
