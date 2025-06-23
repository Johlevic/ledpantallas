<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\descripcion;
use App\Models\imagenes;
use App\Models\producto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ListaProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index()
{
    $productos = Producto::with(['descripcion', 'imagenes'])->get();
    return response()->json($productos); // Devuelve directamente el array
}

    // app/Http/Controllers/ProductoController.php
// En ListaProductosController.php
public function paraCalculadora(): JsonResponse
{
    $productos = Producto::query()
        ->select([
            'id_producto',
            'nombre',
            DB::raw('LOWER(TRIM(tipo_instalacion)) as tipo_instalacion'),
            DB::raw('LOWER(TRIM(tipo)) as tipo'),
            'precio_por_m2',
            'precio_oferta',
            'stock'
        ])
        ->where('stock', '>', 0)
        ->get()
        ->map(function ($item) {
            // Asegurar formato consistente
            $item->tipo_instalacion = strtolower(trim($item->tipo_instalacion));
            $item->tipo = strtolower(trim($item->tipo));
            return $item;
        });

    return response()->json([
        'success' => true,
        'data' => $productos
    ]);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'tipo' => 'required|string|max:50',
            'tipo_instalacion' => 'required|string|max:50', // ← nuevo nombre correcto para producto
            'precio_fijo' => 'required|numeric',
            'precio_oferta' => 'nullable|numeric',
            'precio_por_m2' => 'nullable|numeric',
            'stock' => 'nullable|integer',
            'es_predeterminado' => 'nullable|boolean',

            // Campos de descripción
            'detalle' => 'nullable|string',
            'modelo' => 'nullable|string|max:50',
            'largo_mm' => 'nullable|integer',
            'alto_mm' => 'nullable|integer',
            'proteccion_ambiental' => 'nullable|string|max:100',
            'tipo_led' => 'nullable|string|max:50',
            'montaje' => 'nullable|string|max:255',
            'instalacion' => 'nullable|string|max:255', // instalación de la tabla descripcions
            'resistencia_temperatura_min' => 'nullable|integer',
            'resistencia_temperatura_max' => 'nullable|integer',
            'procesador_imagen' => 'nullable|string|max:255',
            'contraste' => 'nullable|integer',
            'tasa_refresco' => 'nullable|integer',
            'luminosidad_brillo' => 'nullable|string|max:100',
            'propiedades_led' => 'nullable|string',
            'comportamiento_humedad_min' => 'nullable|integer',
            'comportamiento_humedad_max' => 'nullable|integer',
            'angulo_vision_horizontal' => 'nullable|integer',
            'angulo_vision_vertical' => 'nullable|integer',
            'marca_blanca' => 'nullable|boolean',
            'calibracion_cromatica' => 'nullable|string|max:255',
            'reproductor_video' => 'nullable|string|max:255',
            'configuracion' => 'nullable|string|max:100',
            'imagen' => 'nullable|image|max:2048',
        ]);

        // Crear descripción
        $descripcion = descripcion::create($request->only([
            'detalle',
            'modelo',
            'largo_mm',
            'alto_mm',
            'proteccion_ambiental',
            'tipo_led',
            'montaje',
            'instalacion', // instalación técnica
            'resistencia_temperatura_min',
            'resistencia_temperatura_max',
            'procesador_imagen',
            'contraste',
            'tasa_refresco',
            'luminosidad_brillo',
            'propiedades_led',
            'comportamiento_humedad_min',
            'comportamiento_humedad_max',
            'angulo_vision_horizontal',
            'angulo_vision_vertical',
            'marca_blanca',
            'calibracion_cromatica',
            'reproductor_video',
            'configuracion'
        ]));

        // Crear producto
        $producto = Producto::create([
            'nombre' => $request->nombre,
            'tipo' => $request->tipo,
            'tipo_instalacion' => $request->tipo_instalacion, // ← el nuevo campo en producto
            'precio_fijo' => $request->precio_fijo,
            'precio_oferta' => $request->precio_oferta,
            'precio_por_m2' => $request->precio_por_m2,
            'stock' => $request->stock,
            'es_predeterminado' => $request->es_predeterminado ?? false,
            'descripcion_id' => $descripcion->id_descripcion,
        ]);

        // Procesar imagen si viene
        if ($request->hasFile('imagen')) {
            $imagenAnterior = imagenes::where('producto_id', $producto->id_producto)->first();
            if ($imagenAnterior && file_exists(public_path($imagenAnterior->url))) {
                unlink(public_path($imagenAnterior->url));
                $imagenAnterior->delete();
            }

            $file = $request->file('imagen');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('img'), $filename);

            imagenes::create([
                'producto_id' => $producto->id_producto,
                'url' => 'img/' . $filename,
            ]);
        }

        return response()->json(['mensaje' => 'Producto creado exitosamente.']);
    }





    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $producto = Producto::with('descripcion', 'imagenes')->findOrFail($id);

        return response()->json([
            ...$producto->toArray(),
            ...$producto->descripcion->toArray(),
            'imagen' => $producto->imagenes->first()->url ?? null
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $producto = Producto::findOrFail($id);

        $request->validate([
            'nombre' => 'required|string|max:100',
            'tipo' => 'required|string|max:50',
            'tipo_instalacion' => 'required|string|max:50',
            'precio_fijo' => 'required|numeric',
            'precio_oferta' => 'nullable|numeric',
            'precio_por_m2' => 'nullable|numeric',
            'stock' => 'nullable|integer',
            'es_predeterminado' => 'nullable|boolean',

            // Descripción
            'detalle' => 'nullable|string',
            'modelo' => 'nullable|string|max:50',
            'largo_mm' => 'nullable|integer',
            'alto_mm' => 'nullable|integer',
            'proteccion_ambiental' => 'nullable|string|max:100',
            'tipo_led' => 'nullable|string|max:50',
            'montaje' => 'nullable|string|max:255',
            'instalacion' => 'nullable|string|max:255', // campo de descripción
            'resistencia_temperatura_min' => 'nullable|integer',
            'resistencia_temperatura_max' => 'nullable|integer',
            'procesador_imagen' => 'nullable|string|max:255',
            'contraste' => 'nullable|integer',
            'tasa_refresco' => 'nullable|integer',
            'luminosidad_brillo' => 'nullable|string|max:100',
            'propiedades_led' => 'nullable|string',
            'comportamiento_humedad_min' => 'nullable|integer',
            'comportamiento_humedad_max' => 'nullable|integer',
            'angulo_vision_horizontal' => 'nullable|integer',
            'angulo_vision_vertical' => 'nullable|integer',
            'marca_blanca' => 'nullable|boolean',
            'calibracion_cromatica' => 'nullable|string|max:255',
            'reproductor_video' => 'nullable|string|max:255',
            'configuracion' => 'nullable|string|max:100',
            'imagen' => 'nullable|image|max:2048',
        ]);

        // Actualizar producto
        $producto->update([
            'nombre' => $request->nombre,
            'tipo' => $request->tipo,
            'tipo_instalacion' => $request->tipo_instalacion,
            'precio_fijo' => $request->precio_fijo,
            'precio_oferta' => $request->precio_oferta,
            'precio_por_m2' => $request->precio_por_m2,
            'stock' => $request->stock,
            'es_predeterminado' => $request->es_predeterminado ?? false,
        ]);

        // Actualizar descripción si existe
        if ($producto->descripcion) {
            $producto->descripcion->update($request->only([
                'detalle',
                'modelo',
                'largo_mm',
                'alto_mm',
                'proteccion_ambiental',
                'tipo_led',
                'montaje',
                'instalacion',
                'resistencia_temperatura_min',
                'resistencia_temperatura_max',
                'procesador_imagen',
                'contraste',
                'tasa_refresco',
                'luminosidad_brillo',
                'propiedades_led',
                'comportamiento_humedad_min',
                'comportamiento_humedad_max',
                'angulo_vision_horizontal',
                'angulo_vision_vertical',
                'marca_blanca',
                'calibracion_cromatica',
                'reproductor_video',
                'configuracion',
            ]));
        }

        // Guardar nueva imagen (sin eliminar las anteriores)
        if ($request->hasFile('imagen')) {
            $file = $request->file('imagen');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('img'), $filename);

            imagenes::create([
                'producto_id' => $producto->id_producto,
                'url' => 'img/' . $filename,
            ]);
        }

        return response()->json(['mensaje' => 'Producto actualizado correctamente.']);
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
