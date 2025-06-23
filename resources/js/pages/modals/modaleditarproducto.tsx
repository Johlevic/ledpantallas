import axios from 'axios';
import { useEffect, useState } from "react";
import {
  FiEdit, FiX, FiInfo, FiTag, FiGrid, FiDollarSign, FiMaximize2, FiSettings,
  FiImage, FiUpload, FiSave, FiSun, FiSliders
} from 'react-icons/fi';

interface Imagen {
  id_imagen: number;
  producto_id: number;
  ruta?: string;
  url: string;
  nombre_original?: string;
  es_principal?: boolean;
}

interface ProductoBase {
  id_producto?: number;
  nombre: string;
  tipo: string;
  tipo_instalacion: string;
  precio_fijo: string | number | null;
  precio_oferta: string | number | null;
  precio_por_m2: string | number | null;
  stock: number | null;
  es_predeterminado: boolean;
  detalle: string;
  modelo: string;
  largo_mm: string | number | null;
  alto_mm: string | number | null;
  proteccion_ambiental: string;
  tipo_led: string;
  montaje: string;
  instalacion: string;
  resistencia_temperatura_min: string | number | null;
  resistencia_temperatura_max: string | number | null;
  procesador_imagen: string;
  contraste: string | number | null;
  tasa_refresco: string | number | null;
  luminosidad_brillo: string;
  propiedades_led: string;
  comportamiento_humedad_min: string | number | null;
  comportamiento_humedad_max: string | number | null;
  angulo_vision_horizontal: string | number | null;
  angulo_vision_vertical: string | number | null;
  marca_blanca: boolean;
  calibracion_cromatica: string;
  reproductor_video: string;
  configuracion: string;
  imagen?: File | null;
  imagenes?: Imagen[];
  fecha_creacion?: Date | string;
  fecha_actualizacion?: Date | string;
}

interface ProductoConId extends ProductoBase {
  id_producto: number;
  imagenes?: Imagen[]; // Ahora es opcional
}
interface Props {
  producto: ProductoConId;
  visible: boolean;
  onClose: () => void;
  onProductoActualizado: () => void;
}

const ModalEditarProducto = ({ producto, visible, onClose, onProductoActualizado }: Props) => {
  const [form, setForm] = useState({ ...producto });
  const [imagenNombre, setImagenNombre] = useState<string | null>(null);

  useEffect(() => {
    setForm({ ...producto });
    setImagenNombre(producto.imagenes?.[0]?.url?.split("/").pop() || null);
  }, [producto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' && e.target instanceof HTMLInputElement ? e.target.checked : value;
    setForm({ ...form, [name]: newValue });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setForm({ ...form, imagen: file });
      setImagenNombre(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in form) {
  const value = form[key as keyof ProductoConId];

  if (key === 'imagen') {
    // Solo añadir imagen si se seleccionó una nueva
    if (form.imagen instanceof File) {
      formData.append('imagen', form.imagen);
    }
    continue;
  }

  if (value !== null && value !== undefined) {
    if (typeof value === 'boolean') {
      formData.append(key, value ? '1' : '0');
    } else {
      formData.append(key, value as string | Blob);
    }
  }
}


      try {
    await axios.post(`/api/productos/${producto.id_producto}?_method=PUT`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    onProductoActualizado();
    onClose();
  } catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response && error.response.status === 422) {
      console.error('Errores de validación:', error.response.data.errors);
    } else {
      console.error('Error al actualizar producto', error);
    }
  } else {
    console.error('Error inesperado', error);
  }
}


  };

  if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
    {/* Header */}
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center space-x-2">
        <FiEdit className="text-xl text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">Editar Producto</h2>
      </div>
      <button
        onClick={onClose}
        className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
      >
        <FiX className="text-xl" />
      </button>
    </div>

    {/* Body - Scrollable content */}
    <div className="flex-1 overflow-y-auto p-6">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Columna 1 */}
          <div className="space-y-4">
            {/* Información Básica */}
            <div className="space-y-4 rounded-lg bg-gray-50 p-4">
              <h3 className="flex items-center text-sm font-medium text-gray-700">
                <FiInfo className="mr-2" /> Información Básica
              </h3>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Nombre</label>
                <div className="relative">
                  <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Nombre del producto"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Tipo</label>
                <div className="relative">
                  <FiGrid className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="tipo"
                    value={form.tipo}
                    onChange={handleChange}
                    className="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Tipo de producto"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Tipo de instalación</label>
                <input
                  name="tipo_instalacion"
                  value={form.tipo_instalacion}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Tipo de instalación"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Precio fijo</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      name="precio_fijo"
                      value={form.precio_fijo || ''}
                      onChange={handleChange}
                      type="number"
                      className="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Precio fijo"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Precio oferta</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      name="precio_oferta"
                      value={form.precio_oferta || ''}
                      onChange={handleChange}
                      type="number"
                      className="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Precio oferta"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Precio por m²</label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    name="precio_por_m2"
                    value={form.precio_por_m2 || ''}
                    onChange={handleChange}
                    type="number"
                    className="w-full rounded-lg border py-2 pl-10 pr-4 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Precio por m²"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock || ''}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Cantidad en stock"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Modelo</label>
                <input
                  name="modelo"
                  value={form.modelo}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Modelo"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Detalle</label>
                <textarea
                  name="detalle"
                  value={form.detalle}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Descripción detallada"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="es_predeterminado"
                  checked={form.es_predeterminado}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-2 block text-sm text-gray-700">Producto predeterminado</label>
              </div>
            </div>

            {/* Dimensiones */}
            <div className="space-y-4 rounded-lg bg-gray-50 p-4">
              <h3 className="flex items-center text-sm font-medium text-gray-700">
                <FiMaximize2 className="mr-2" /> Dimensiones
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Largo (mm)</label>
                  <input
                    name="largo_mm"
                    value={form.largo_mm || ''}
                    onChange={handleChange}
                    type="number"
                    className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Largo en milímetros"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Alto (mm)</label>
                  <input
                    name="alto_mm"
                    value={form.alto_mm || ''}
                    onChange={handleChange}
                    type="number"
                    className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Alto en milímetros"
                  />
                </div>
              </div>
            </div>

            {/* Características LED */}
            <div className="space-y-4 rounded-lg bg-gray-50 p-4">
              <h3 className="flex items-center text-sm font-medium text-gray-700">
                <FiSun className="mr-2" /> Características LED
              </h3>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Tipo LED</label>
                <input
                  name="tipo_led"
                  value={form.tipo_led}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Tipo de LED"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Propiedades LED</label>
                <input
                  name="propiedades_led"
                  value={form.propiedades_led}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Propiedades del LED"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Luminosidad/Brillo</label>
                <input
                  name="luminosidad_brillo"
                  value={form.luminosidad_brillo}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Nivel de luminosidad"
                />
              </div>
            </div>
          </div>

          {/* Columna 2 */}
          <div className="space-y-4">
            {/* Características Técnicas */}
            <div className="space-y-4 rounded-lg bg-gray-50 p-4">
              <h3 className="flex items-center text-sm font-medium text-gray-700">
                <FiSettings className="mr-2" /> Características Técnicas
              </h3>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Protección ambiental</label>
                <input
                  name="proteccion_ambiental"
                  value={form.proteccion_ambiental}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Nivel de protección"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Montaje</label>
                <input
                  name="montaje"
                  value={form.montaje}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Tipo de montaje"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Instalación</label>
                <input
                  name="instalacion"
                  value={form.instalacion}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Tipo de instalación"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Temp. mínima (°C)</label>
                  <input
                    name="resistencia_temperatura_min"
                    value={form.resistencia_temperatura_min || ''}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Temperatura mínima"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Temp. máxima (°C)</label>
                  <input
                    name="resistencia_temperatura_max"
                    value={form.resistencia_temperatura_max || ''}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Temperatura máxima"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Humedad mínima (%)</label>
                  <input
                    name="comportamiento_humedad_min"
                    value={form.comportamiento_humedad_min  || ''}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Humedad mínima"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Humedad máxima (%)</label>
                  <input
                    name="comportamiento_humedad_max"
                    value={form.comportamiento_humedad_max || ''}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Humedad máxima"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Procesador de imagen</label>
                <input
                  name="procesador_imagen"
                  value={form.procesador_imagen}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Tipo de procesador"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Contraste</label>
                  <input
                    name="contraste"
                    value={form.contraste || ''}
                    onChange={handleChange}
                    type="number"
                    className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Nivel de contraste"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Tasa refresco (Hz)</label>
                  <input
                    name="tasa_refresco"
                    value={form.tasa_refresco || ''}
                    onChange={handleChange}
                    type="number"
                    className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Tasa de refresco"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Ángulo visión horizontal</label>
                  <input
                    name="angulo_vision_horizontal"
                    value={form.angulo_vision_horizontal || ''}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Ángulo horizontal"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Ángulo visión vertical</label>
                  <input
                    name="angulo_vision_vertical"
                    value={form.angulo_vision_vertical || ''    }
                    onChange={handleChange}
                    className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Ángulo vertical"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Calibración cromática</label>
                <input
                  name="calibracion_cromatica"
                  value={form.calibracion_cromatica}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Tipo de calibración"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Reproductor de video</label>
                <input
                  name="reproductor_video"
                  value={form.reproductor_video}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Tipo de reproductor"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Configuración</label>
                <textarea
                  name="configuracion"
                  value={form.configuracion}
                  onChange={handleChange}
                  rows={2}
                  className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Configuraciones adicionales"
                />
              </div>
            </div>

            {/* Imagen del Producto */}
            <div className="space-y-4 rounded-lg bg-gray-50 p-4">
              <h3 className="flex items-center text-sm font-medium text-gray-700">
                <FiImage className="mr-2" /> Imagen del Producto
              </h3>

              {imagenNombre && (
                <p className="text-sm text-gray-600 mt-1">
                  Archivo seleccionado: <strong>{imagenNombre}</strong>
                </p>
              )}

              {producto.imagenes && producto.imagenes.length > 0 && (
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">Imagen actual</label>
                  <img
                    src={`http://localhost:8000/${producto.imagenes[0].url}`}
                    alt="Imagen actual del producto"
                    className="h-40 w-full rounded-lg object-contain shadow"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {producto.imagenes ? 'Cambiar imagen' : 'Subir imagen'}
                </label>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6">
                  <div className="text-center">
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <input
                      name="imagen"
                      type="file"
                      onChange={handleFileChange}
                      className="sr-only"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="mt-2 cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <span>Seleccionar archivo</span>
                    </label>
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Configuración */}
            <div className="space-y-4 rounded-lg bg-gray-50 p-4">
              <h3 className="flex items-center text-sm font-medium text-gray-700">
                <FiSliders className="mr-2" /> Configuración
              </h3>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="marca_blanca"
                  checked={form.marca_blanca}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-2 block text-sm text-gray-700">Marca blanca</label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    {/* Footer */}
    <div className="flex justify-end space-x-3 border-t bg-gray-50 p-4">
      <button
        type="button"
        onClick={onClose}
        className="flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
      >
        <FiX className="mr-2" /> Cancelar
      </button>
      <button
        type="submit"
        onClick={handleSubmit}
        className="flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <FiSave className="mr-2" /> Guardar Cambios
      </button>
    </div>
  </div>
</div>
    );
};

export default ModalEditarProducto;
