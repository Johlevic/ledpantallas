import axios from 'axios';
import React from 'react';

import { FiDollarSign, FiGrid, FiImage, FiMaximize2, FiPlus, FiSave, FiSliders, FiSun, FiTag, FiTool, FiUpload, FiX } from 'react-icons/fi';
import { NuevoProducto } from '../../types/types';
interface Producto {
    id_producto: number;
    nombre: string;
    tipo: string;
    precio_fijo: number;
}

interface Props {
    visible: boolean;
    onClose: () => void;
    nuevoProducto: NuevoProducto;
    setNuevoProducto: (producto: NuevoProducto) => void;
    setProductos: (productos: Producto[]) => void;
    tiposProductos: string[];
    setError: (err: string | null) => void;
}

const ModalNuevoProducto = ({ visible, onClose, nuevoProducto, setNuevoProducto, setProductos, tiposProductos, setError }: Props) => {
    if (!visible) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type } = e.target;
        const value = type === 'checkbox' && e.target instanceof HTMLInputElement ? e.target.checked : e.target.value;
        setNuevoProducto({ ...nuevoProducto, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setNuevoProducto({ ...nuevoProducto, imagen: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        const fields = Object.keys(nuevoProducto) as Array<keyof NuevoProducto>;

        fields.forEach((key) => {
            const value = nuevoProducto[key];
            if (value !== null && value !== undefined && value !== '') {
                if (typeof value === 'boolean') {
                    formData.append(key, value ? '1' : '0');
                } else if (key === 'imagen' && value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, String(value));
                }
            }
        });

        try {
            await axios.post('/api/productos', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            onClose();
            const res = await axios.get('/api/productos');
            setProductos(res.data);
            setNuevoProducto({
                nombre: '',
                tipo: '',
                tipo_instalacion: '',
                precio_fijo: '',
                precio_oferta: '',
                precio_por_m2: '',
                stock: null,
                es_predeterminado: false,
                detalle: '',
                modelo: '',
                largo_mm: '',
                alto_mm: '',
                proteccion_ambiental: '',
                tipo_led: '',
                montaje: '',
                instalacion: '',
                resistencia_temperatura_min: '',
                resistencia_temperatura_max: '',
                procesador_imagen: '',
                contraste: '',
                tasa_refresco: '',
                luminosidad_brillo: '',
                propiedades_led: '',
                comportamiento_humedad_min: '',
                comportamiento_humedad_max: '',
                angulo_vision_horizontal: '',
                angulo_vision_vertical: '',
                marca_blanca: false,
                calibracion_cromatica: '',
                reproductor_video: '',
                configuracion: '',
                imagen: null,
            });
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Error al guardar el producto');
            } else {
                setError('Error desconocido al guardar el producto');
            }
        }
    };

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center space-x-2">
                        <FiPlus className="text-xl text-indigo-600" />
                        <h2 className="text-xl font-semibold text-indigo-700">Registrar nuevo producto</h2>
                    </div>
                    <button onClick={onClose} className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
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
                                        <FiTag className="mr-2" /> Información Básica
                                    </h3>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Nombre</label>
                                        <input
                                            name="nombre"
                                            placeholder="Nombre del producto"
                                            value={nuevoProducto.nombre}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Tipo</label>
                                        <div className="relative">
                                            <FiGrid className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                                            <select
                                                name="tipo"
                                                value={nuevoProducto.tipo}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border py-2 pr-4 pl-10 focus:border-indigo-500 focus:ring-indigo-500"
                                            >
                                                <option value="">Seleccione tipo</option>
                                                {tiposProductos.map((tipo) => (
                                                    <option key={tipo} value={tipo}>
                                                        {tipo}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Tipo de instalación</label>
                                        <input
                                            name="tipo_instalacion"
                                            placeholder="Tipo de instalación"
                                            value={nuevoProducto.tipo_instalacion}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Precio fijo</label>
                                            <div className="relative">
                                                <FiDollarSign className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="number"
                                                    name="precio_fijo"
                                                    placeholder="0.00"
                                                    value={nuevoProducto.precio_fijo}
                                                    onChange={handleChange}
                                                    className="w-full rounded-lg border py-2 pr-4 pl-10 focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Precio oferta</label>
                                            <div className="relative">
                                                <FiDollarSign className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="number"
                                                    name="precio_oferta"
                                                    placeholder="0.00"
                                                    value={nuevoProducto.precio_oferta || ''}
                                                    onChange={handleChange}
                                                    className="w-full rounded-lg border py-2 pr-4 pl-10 focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Precio por m²</label>
                                        <div className="relative">
                                            <FiDollarSign className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="number"
                                                name="precio_por_m2"
                                                placeholder="0.00"
                                                value={nuevoProducto.precio_por_m2 || ''}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border py-2 pr-4 pl-10 focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Stock</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            placeholder="Cantidad en stock"
                                            value={nuevoProducto.stock || ''}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Modelo</label>
                                        <input
                                            name="modelo"
                                            placeholder="Modelo del producto"
                                            value={nuevoProducto.modelo}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Detalle</label>
                                        <textarea
                                            name="detalle"
                                            placeholder="Descripción detallada del producto"
                                            value={nuevoProducto.detalle}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="es_predeterminado"
                                            checked={nuevoProducto.es_predeterminado}
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
                                                placeholder="0"
                                                value={nuevoProducto.largo_mm}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Alto (mm)</label>
                                            <input
                                                name="alto_mm"
                                                placeholder="0"
                                                value={nuevoProducto.alto_mm}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
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
                                            placeholder="Tipo de LED"
                                            value={nuevoProducto.tipo_led}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Propiedades LED</label>
                                        <input
                                            name="propiedades_led"
                                            placeholder="Propiedades del LED"
                                            value={nuevoProducto.propiedades_led}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Luminosidad/Brillo</label>
                                        <input
                                            name="luminosidad_brillo"
                                            placeholder="Nivel de luminosidad"
                                            value={nuevoProducto.luminosidad_brillo}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Columna 2 */}
                            <div className="space-y-4">
                                {/* Características Técnicas */}
                                <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                                    <h3 className="flex items-center text-sm font-medium text-gray-700">
                                        <FiTool className="mr-2" /> Características Técnicas
                                    </h3>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Protección ambiental</label>
                                        <input
                                            name="proteccion_ambiental"
                                            placeholder="Nivel de protección"
                                            value={nuevoProducto.proteccion_ambiental}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Montaje</label>
                                        <input
                                            name="montaje"
                                            placeholder="Tipo de montaje"
                                            value={nuevoProducto.montaje}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Instalación</label>
                                        <input
                                            name="instalacion"
                                            placeholder="Tipo de instalación"
                                            value={nuevoProducto.instalacion}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Temp. mínima (°C)</label>
                                            <input
                                                name="resistencia_temperatura_min"
                                                placeholder="0"
                                                value={nuevoProducto.resistencia_temperatura_min}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Temp. máxima (°C)</label>
                                            <input
                                                name="resistencia_temperatura_max"
                                                placeholder="0"
                                                value={nuevoProducto.resistencia_temperatura_max}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Humedad mínima (%)</label>
                                            <input
                                                name="comportamiento_humedad_min"
                                                placeholder="0"
                                                value={nuevoProducto.comportamiento_humedad_min}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Humedad máxima (%)</label>
                                            <input
                                                name="comportamiento_humedad_max"
                                                placeholder="0"
                                                value={nuevoProducto.comportamiento_humedad_max}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Procesador de imagen</label>
                                        <input
                                            name="procesador_imagen"
                                            placeholder="Tipo de procesador"
                                            value={nuevoProducto.procesador_imagen}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Contraste</label>
                                            <input
                                                type="number"
                                                name="contraste"
                                                placeholder="0"
                                                value={nuevoProducto.contraste}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Tasa refresco (Hz)</label>
                                            <input
                                                type="number"
                                                name="tasa_refresco"
                                                placeholder="0"
                                                value={nuevoProducto.tasa_refresco}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Ángulo visión horizontal</label>
                                            <input
                                                name="angulo_vision_horizontal"
                                                placeholder="0°"
                                                value={nuevoProducto.angulo_vision_horizontal}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">Ángulo visión vertical</label>
                                            <input
                                                name="angulo_vision_vertical"
                                                placeholder="0°"
                                                value={nuevoProducto.angulo_vision_vertical}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Calibración cromática</label>
                                        <input
                                            name="calibracion_cromatica"
                                            placeholder="Tipo de calibración"
                                            value={nuevoProducto.calibracion_cromatica}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Reproductor de video</label>
                                        <input
                                            name="reproductor_video"
                                            placeholder="Tipo de reproductor"
                                            value={nuevoProducto.reproductor_video}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Configuración</label>
                                        <textarea
                                            name="configuracion"
                                            placeholder="Configuraciones adicionales"
                                            value={nuevoProducto.configuracion}
                                            onChange={handleChange}
                                            rows={2}
                                            className="w-full rounded-lg border px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                {/* Imagen del Producto */}
                                <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                                    <h3 className="flex items-center text-sm font-medium text-gray-700">
                                        <FiImage className="mr-2" /> Imagen del Producto
                                    </h3>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Subir imagen</label>
                                        <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6">
                                            <div className="text-center">
                                                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                                                <input type="file" name="imagen" onChange={handleFileChange} className="sr-only" id="file-upload" />
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
                                            checked={nuevoProducto.marca_blanca}
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
                        className="flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                    >
                        <FiSave className="mr-2" /> Guardar Producto
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalNuevoProducto;
