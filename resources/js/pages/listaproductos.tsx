import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiEdit, FiFilter, FiInfo, FiPlus, FiSearch, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ModalEditarProducto from './modals/modaleditarproducto';
import ModalNuevoProducto from './modals/ModalNuevoProducto';

// ✅ Interfaces importadas desde tu archivo centralizado
import { NuevoProducto, Producto, ProductoConId } from '../types/types';

const obtenerProductoCompleto = async (id_producto: number): Promise<ProductoConId> => {
    const res = await axios.get(`/api/productos/${id_producto}`);
    return res.data;
};

const ListaProductos = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [filteredProductos, setFilteredProductos] = useState<Producto[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tipoFilter, setTipoFilter] = useState<string>('todos');
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const [mostrarModalNuevoProducto, setMostrarModalNuevoProducto] = useState(false);
    const [productoAEditar, setProductoAEditar] = useState<ProductoConId | null>(null);
    const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

    const navigate = useNavigate();

    const [nuevoProducto, setNuevoProducto] = useState<NuevoProducto>({
        nombre: '',
        tipo: '',
        tipo_instalacion: '',
        precio_fijo: '',
        precio_oferta: null,
        precio_por_m2: null,
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

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await axios.get('/api/productos');
                setProductos(res.data);
                setFilteredProductos(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Error al cargar los productos');
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    useEffect(() => {
        let result = productos;

        if (searchTerm) {
            result = result.filter(
                (producto) =>
                    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    producto.tipo.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        if (tipoFilter !== 'todos') {
            result = result.filter((producto) => producto.tipo === tipoFilter);
        }

        if (sortConfig !== null) {
            result = [...result].sort((a, b) => {
                const aValue = a[sortConfig.key as keyof Producto];
                const bValue = b[sortConfig.key as keyof Producto];
                if (aValue == null) return 1;
                if (bValue == null) return -1;
                if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }

        setFilteredProductos(result);
        setCurrentPage(1);
    }, [productos, searchTerm, tipoFilter, sortConfig]);

    const requestSort = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProductos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProductos.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const getSortIcon = (key: string) => {
        if (!sortConfig || sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? '↑' : '↓';
    };

    const tiposProductos = ['3p', '5p', '8p', ...new Set(productos.map((p) => p.tipo))].filter(
        (tipo, index, self) => tipo && self.indexOf(tipo) === index,
    );

    return (
        <div className="p-4">
            <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <h1 className="text-xl font-bold">Productos</h1>
                <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
                    <div className="relative flex-grow">
                        <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border py-2 pr-4 pl-10"
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="relative">
                            <select
                                value={tipoFilter}
                                onChange={(e) => setTipoFilter(e.target.value)}
                                className="appearance-none rounded-lg border py-2 pr-8 pl-3"
                            >
                                <option value="todos">Todos los tipos</option>
                                {tiposProductos.map((tipo) => (
                                    <option key={tipo} value={tipo}>
                                        {tipo}
                                    </option>
                                ))}
                            </select>
                            <FiFilter className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform" />
                        </div>

                        <button
                            onClick={() => setMostrarModalNuevoProducto(true)}
                            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                        >
                            <FiPlus /> Nuevo
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            ) : error ? (
                <div className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="hidden w-full border text-sm md:table">
                            <thead className="rounded-t-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md">
                                <tr>
                                    <th className="cursor-pointer border-b border-indigo-300 p-4 text-left" onClick={() => requestSort('nombre')}>
                                        <div className="flex items-center justify-between">
                                            Nombre <span>{getSortIcon('nombre')}</span>
                                        </div>
                                    </th>
                                    <th className="cursor-pointer border-b border-indigo-300 p-4 text-left" onClick={() => requestSort('tipo')}>
                                        <div className="flex items-center justify-between">
                                            Tipo <span>{getSortIcon('tipo')}</span>
                                        </div>
                                    </th>
                                    <th
                                        className="cursor-pointer border-b border-indigo-300 p-4 text-left"
                                        onClick={() => requestSort('precio_fijo')}
                                    >
                                        <div className="flex items-center justify-between">
                                            Precio <span>{getSortIcon('precio_fijo')}</span>
                                        </div>
                                    </th>
                                    <th className="border-b border-indigo-300 p-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 rounded-b-lg bg-white text-gray-700 shadow-sm">
                                {currentItems.map((producto) => (
                                    <tr key={producto.id_producto} className="group transition-colors duration-150 hover:bg-indigo-50">
                                        <td className="border-b border-gray-100 p-4 font-medium">{producto.nombre}</td>
                                        <td className="border-b border-gray-100 p-4">{producto.tipo}</td>
                                        <td className="border-b border-gray-100 p-4">S/ {Number(producto.precio_fijo).toFixed(2)}</td>
                                        <td className="border-b border-gray-100 p-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100">
                                                <button
                                                    onClick={() => navigate(`/productos/${producto.id_producto}`)}
                                                    className="rounded-full p-2 text-blue-600 transition-colors duration-200 hover:bg-blue-100 hover:text-blue-800"
                                                    title="Ver detalles"
                                                >
                                                    <FiInfo size={18} />
                                                </button>
                                                <button
                                                    className="rounded-full p-2 text-green-600 transition-colors duration-200 hover:bg-green-100 hover:text-green-800"
                                                    title="Editar"
                                                    onClick={async () => {
                                                        try {
                                                            const data = await obtenerProductoCompleto(producto.id_producto);
                                                            setProductoAEditar(data);
                                                            setMostrarModalEditar(true);
                                                        } catch (error) {
                                                            console.error('Error al obtener el producto completo:', error);
                                                        }
                                                    }}
                                                >
                                                    <FiEdit size={18} />
                                                </button>
                                                <button
                                                    className="rounded-full p-2 text-red-600 transition-colors duration-200 hover:bg-red-100 hover:text-red-800"
                                                    title="Eliminar"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <ModalNuevoProducto
                        visible={mostrarModalNuevoProducto}
                        onClose={() => setMostrarModalNuevoProducto(false)}
                        nuevoProducto={nuevoProducto}
                        setNuevoProducto={setNuevoProducto}
                        setProductos={setProductos}
                        tiposProductos={tiposProductos}
                        setError={setError}
                    />

                    {productoAEditar && (
                        <ModalEditarProducto
                            producto={productoAEditar}
                            visible={mostrarModalEditar}
                            onClose={() => setMostrarModalEditar(false)}
                            onProductoActualizado={async () => {
                                const res = await axios.get('/api/productos');
                                setProductos(res.data);
                            }}
                        />
                    )}

                    {/* Versión responsive para móviles con cards */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {currentItems.map((producto) => (
                            <div key={producto.id_producto} className="rounded-xl border bg-white shadow-sm">
                                {/* Header */}
                                <div className="rounded-t-xl bg-gray-100 px-4 py-3">
                                    <h2 className="text-lg font-semibold text-gray-800">{producto.nombre}</h2>
                                </div>

                                {/* Body */}
                                <div className="space-y-1 px-4 py-2 text-sm text-gray-700">
                                    <p>
                                        <span className="font-medium">Tipo:</span> {producto.tipo}
                                    </p>
                                    <p>
                                        <span className="font-medium">Precio:</span> S/ {Number(producto.precio_fijo).toFixed(2)}
                                    </p>
                                </div>

                                {/* Footer con acciones */}
                                <div className="flex items-center justify-end gap-3 border-t px-4 py-2">
                                    <button
                                        onClick={() => navigate(`/productos/${producto.id_producto}`)}
                                        className="rounded-full p-2 text-blue-600 hover:bg-blue-100 hover:text-blue-800"
                                        title="Ver detalles"
                                    >
                                        <FiInfo size={18} />
                                    </button>
                                    <button
                                        onClick={async () => {
                                            try {
                                                const data = await obtenerProductoCompleto(producto.id_producto);
                                                setProductoAEditar(data);
                                                setMostrarModalEditar(true);
                                            } catch (error) {
                                                console.error('Error al obtener el producto completo:', error);
                                            }
                                        }}
                                        className="rounded-full p-2 text-green-600 hover:bg-green-100 hover:text-green-800"
                                        title="Editar"
                                    >
                                        <FiEdit size={18} />
                                    </button>
                                    <button className="rounded-full p-2 text-red-600 hover:bg-red-100 hover:text-red-800" title="Eliminar">
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Paginación común para todas las vistas */}
                    {filteredProductos.length > itemsPerPage && (
                        <div className="mt-4 flex flex-col items-center justify-between gap-3 md:flex-row">
                            <div className="text-sm text-gray-600">
                                Mostrando {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, filteredProductos.length)} de {filteredProductos.length}{' '}
                                productos
                            </div>

                            <div className="flex gap-1">
                                <button
                                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className={`rounded p-2 ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : 'text-gray-700 hover:bg-gray-200'}`}
                                >
                                    <FiChevronLeft size={20} />
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`h-10 w-10 rounded ${
                                            currentPage === number ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {number}
                                    </button>
                                ))}

                                <button
                                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`rounded p-2 ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : 'text-gray-700 hover:bg-gray-200'}`}
                                >
                                    <FiChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ListaProductos;
