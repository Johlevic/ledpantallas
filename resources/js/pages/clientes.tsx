import { Popover } from '@headlessui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaEllipsisV, FaEnvelope, FaFileCsv, FaFileExcel, FaFilePdf, FaPhone, FaTrash, FaWhatsapp } from 'react-icons/fa';

interface Cliente {
    id_cliente: number;
    nombre: string | null;
    empresa: string | null;
    tipo_documento: 'DNI' | 'RUC';
    numero_documento: string;
    telefono: string | null;
    email: string | null;
}

const Clientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [filtro, setFiltro] = useState<'todos' | 'clientes' | 'empresas'>('todos');
    const [busqueda, setBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [clienteEdit, setClienteEdit] = useState<Cliente | null>(null);
    const porPagina = 5;

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            const response = await axios.get('/api/clientes');
            setClientes(response.data);
        } catch (error: unknown) {
            console.error(error);
        }
    };

    const handleEliminar = async (id: number) => {
        if (!confirm('¿Eliminar este cliente?')) return;
        try {
            await axios.delete(`/api/clientes/${id}`);
            fetchClientes();
        } catch {
            alert('Error al eliminar');
        }
    };

    const exportar = (formato: 'pdf' | 'excel' | 'csv') => {
        window.open(`/api/export/clientes/${formato}?filtro=${filtro}&busqueda=${encodeURIComponent(busqueda)}`, '_blank');
    };

    const handleEditar = (cliente: Cliente) => {
        setClienteEdit(cliente);
    };

    const guardarCambios = async () => {
        if (!clienteEdit) return;
        try {
            await axios.put(`/api/clientes/${clienteEdit.id_cliente}`, clienteEdit);
            fetchClientes();
            setClienteEdit(null);
        } catch {
            alert('Error al actualizar');
        }
    };

    const filtrarClientes = (): Cliente[] => {
        return clientes
            .filter((c) => {
                if (filtro === 'clientes') return c.tipo_documento === 'DNI';
                if (filtro === 'empresas') return c.tipo_documento === 'RUC';
                return true;
            })
            .filter((c) => {
                const texto = busqueda.toLowerCase();
                return (c.nombre?.toLowerCase().includes(texto) ?? false) || (c.empresa?.toLowerCase().includes(texto) ?? false);
            });
    };

    const clientesFiltrados = filtrarClientes();
    const totalPaginas = Math.ceil(clientesFiltrados.length / porPagina);
    const clientesVisibles = clientesFiltrados.slice((paginaActual - 1) * porPagina, paginaActual * porPagina);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h2 className="text-2xl font-bold text-indigo-700">Gestión de Clientes</h2>
                <div className="flex items-center gap-2">
                    <select
                        value={filtro}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setFiltro(e.target.value as 'todos' | 'clientes' | 'empresas');
                            setPaginaActual(1);
                        }}
                        className="rounded border px-3 py-1 text-sm"
                    >
                        <option value="todos">Todos</option>
                        <option value="clientes">Solo Clientes (DNI)</option>
                        <option value="empresas">Solo Empresas (RUC)</option>
                    </select>
                    <span className="text-sm text-gray-700">{clientesFiltrados.length} registros</span>
                </div>
            </div>

            <div className="mb-6 flex gap-3">
                <button
                    onClick={() => exportar('pdf')}
                    className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
                >
                    <FaFilePdf className="text-lg" />
                </button>
                <button
                    onClick={() => exportar('excel')}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                >
                    <FaFileExcel className="text-lg" />
                </button>
                <button
                    onClick={() => exportar('csv')}
                    className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                >
                    <FaFileCsv className="text-lg" />
                </button>
            </div>
            <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre o empresa..."
                className="mb-4 w-full rounded border px-3 py-2 shadow-sm sm:w-1/2"
            />

            <div className="grid gap-4 sm:hidden">
                {clientesVisibles.map((cliente) => (
                    <div key={cliente.id_cliente} className="rounded-xl bg-white p-4 shadow">
                        <div className="font-bold text-indigo-700">{cliente.tipo_documento === 'DNI' ? cliente.nombre : cliente.empresa}</div>
                        <div className="text-sm text-gray-600">
                            {cliente.tipo_documento}-{cliente.numero_documento}
                        </div>
                        <div className="mt-2 text-sm">
                            <div>
                                <strong>Email:</strong> {cliente.email ?? '-'}
                            </div>
                            <div>
                                <strong>Teléfono:</strong> {cliente.telefono ?? '-'}
                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap justify-end gap-3 text-sm text-indigo-700">
                            {cliente.telefono && (
                                <a href={`tel:${cliente.telefono}`} className="flex items-center gap-1 hover:text-indigo-900" title="Llamar">
                                    <FaPhone />
                                </a>
                            )}
                            {cliente.email && (
                                <a href={`mailto:${cliente.email}`} className="flex items-center gap-1 hover:text-indigo-900" title="Enviar correo">
                                    <FaEnvelope />
                                </a>
                            )}
                            <button
                                onClick={() => handleEditar(cliente)}
                                className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800"
                                title="Editar"
                            >
                                <FaEdit /> Editar
                            </button>
                            <button
                                onClick={() => handleEliminar(cliente.id_cliente)}
                                className="flex items-center gap-1 text-red-600 hover:text-red-800"
                                title="Eliminar"
                            >
                                <FaTrash /> Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="hidden overflow-x-auto rounded-xl bg-white shadow sm:block">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">#</th>
                            {filtro !== 'empresas' && <th className="px-4 py-2 text-left">Nombre</th>}
                            {filtro !== 'clientes' && <th className="px-4 py-2 text-left">Empresa</th>}
                            <th className="px-4 py-2 text-left">Documento</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Teléfono</th>
                            <th className="px-4 py-2 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {clientesVisibles.map((cliente, index) => (
                            <tr key={cliente.id_cliente} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{(paginaActual - 1) * porPagina + index + 1}</td>
                                {filtro !== 'empresas' && <td className="px-4 py-2">{cliente.nombre ?? '-'}</td>}
                                {filtro !== 'clientes' && <td className="px-4 py-2">{cliente.empresa ?? '-'}</td>}
                                <td className="px-4 py-2">
                                    {cliente.tipo_documento}-{cliente.numero_documento}
                                </td>

                                <td className="px-4 py-2">
                                    {cliente.email ? (
                                        <a
                                            href={`mailto:${cliente.email}`}
                                            className="inline-flex items-center text-blue-500 hover:text-blue-700 hover:underline"
                                        >
                                            <FaEnvelope className="mr-1" />
                                            {cliente.email}
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {cliente.telefono ? (
                                        <Popover className="relative">
                                            {() => (
                                                <>
                                                    <Popover.Button className="inline-flex items-center text-blue-500 hover:text-blue-700 focus:outline-none">
                                                        <FaPhone className="mr-1" />
                                                        {cliente.telefono}
                                                        <FaEllipsisV className="ml-1 text-xs" />
                                                    </Popover.Button>

                                                    <Popover.Panel className="ring-opacity-5 absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black">
                                                        <div className="p-2">
                                                            <a
                                                                href={`tel:${cliente.telefono}`}
                                                                className="flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                <FaPhone className="mr-2 text-blue-500" />
                                                                Llamar
                                                            </a>
                                                            {cliente.telefono && (
                                                                <a
                                                                    href={`https://wa.me/${cliente.telefono.replace(/\D/g, '')}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                >
                                                                    <FaWhatsapp className="mr-2 text-green-500" />
                                                                    WhatsApp
                                                                </a>
                                                            )}
                                                        </div>
                                                    </Popover.Panel>
                                                </>
                                            )}
                                        </Popover>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td className="space-x-2 px-4 py-2">
                                    <button onClick={() => handleEditar(cliente)} className="text-yellow-600 hover:text-yellow-800">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleEliminar(cliente.id_cliente)} className="text-red-600 hover:text-red-800">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {clienteEdit && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <h3 className="mb-4 text-lg font-bold">Editar Cliente</h3>
                        <label className="mb-2 block">
                            Nombre:
                            <input
                                type="text"
                                value={clienteEdit.nombre ?? ''}
                                onChange={(e) => setClienteEdit({ ...clienteEdit, nombre: e.target.value })}
                                className="w-full rounded border p-2"
                            />
                        </label>
                        <label className="mb-2 block">
                            Empresa:
                            <input
                                type="text"
                                value={clienteEdit.empresa ?? ''}
                                onChange={(e) => setClienteEdit({ ...clienteEdit, empresa: e.target.value })}
                                className="w-full rounded border p-2"
                            />
                        </label>
                        <label className="mb-2 block">
                            Email:
                            <input
                                type="email"
                                value={clienteEdit.email ?? ''}
                                onChange={(e) => setClienteEdit({ ...clienteEdit, email: e.target.value })}
                                className="w-full rounded border p-2"
                            />
                        </label>
                        <label className="mb-4 block">
                            Teléfono:
                            <input
                                type="text"
                                value={clienteEdit.telefono ?? ''}
                                onChange={(e) => setClienteEdit({ ...clienteEdit, telefono: e.target.value })}
                                className="w-full rounded border p-2"
                            />
                        </label>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setClienteEdit(null)} className="rounded bg-gray-300 px-4 py-2">
                                Cancelar
                            </button>
                            <button onClick={guardarCambios} className="rounded bg-indigo-600 px-4 py-2 text-white">
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-6 flex items-center justify-between text-sm">
                <button
                    onClick={() => setPaginaActual(paginaActual - 1)}
                    disabled={paginaActual === 1}
                    className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 disabled:opacity-50"
                >
                    Anterior
                </button>
                <p>
                    Página {paginaActual} de {totalPaginas}
                </p>
                <button
                    onClick={() => setPaginaActual(paginaActual + 1)}
                    disabled={paginaActual === totalPaginas}
                    className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400 disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default Clientes;
