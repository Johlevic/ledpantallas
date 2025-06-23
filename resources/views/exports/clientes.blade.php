<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Clientes PDF</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #000; padding: 6px; text-align: left; }
        th { background: #f0f0f0; }
    </style>
</head>
<body>
    <h2>Lista de Clientes</h2>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Empresa</th>
                <th>Tipo Doc</th>
                <th>Número</th>
                <th>Teléfono</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            @foreach($clientes as $c)
            <tr>
                <td>{{ $c->id_cliente }}</td>
                <td>{{ $c->nombre }}</td>
                <td>{{ $c->empresa }}</td>
                <td>{{ $c->tipo_documento }}</td>
                <td>{{ $c->numero_documento }}</td>
                <td>{{ $c->telefono }}</td>
                <td>{{ $c->email }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
