export interface NuevoProducto {
  nombre: string;
  tipo: string;
  tipo_instalacion: string; // ← nuevo campo
  precio_fijo: string | number;
  precio_oferta: string | number | null; // ← nuevo campo
  precio_por_m2: string | number | null; // ← nuevo campo
  stock: number | null; // ← nuevo campo
  es_predeterminado: boolean; // ← nuevo campo

  // Campos de descripción
  detalle: string;
  modelo: string;
  largo_mm: string | number;
  alto_mm: string | number;
  proteccion_ambiental: string;
  tipo_led: string;
  montaje: string;
  instalacion: string; // descripción técnica
  resistencia_temperatura_min: string | number;
  resistencia_temperatura_max: string | number;
  procesador_imagen: string;
  contraste: string | number;
  tasa_refresco: string | number;
  luminosidad_brillo: string;
  propiedades_led: string;
  comportamiento_humedad_min: string | number;
  comportamiento_humedad_max: string | number;
  angulo_vision_horizontal: string | number;
  angulo_vision_vertical: string | number;
  marca_blanca: boolean;
  calibracion_cromatica: string;
  reproductor_video: string;
  configuracion: string;
  imagen: File | null;
}


export interface Producto {
  id_producto: number;
  nombre: string;
  tipo: string;
  precio_fijo: number;
  imagen?: string;
}

export interface ProductoConId extends NuevoProducto {
  id_producto: number;

}

export interface ProductoCalculadora {
    id_producto: number;
    nombre: string;
    tipo: string;
    tipo_instalacion: string;
    precio_por_m2: number;
    precio_fijo: number;
    precio_oferta?: number;
    stock?: number;
    descripcion?: {
        id: number;
        contenido: string;
    };
    imagenes?: {
        id: number;
        url: string;
    }[];
}

