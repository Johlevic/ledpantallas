import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';

interface Producto {
  nombre: string;
}

interface DetallePedido {
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  producto?: Producto;
}

interface Pedido {
  id_pedido: number;
  estado: 'pendiente' | 'atendiendo' | 'atendido';
  detalles: DetallePedido[];
}

interface Cliente {
  id_cliente: number;
  nombre: string;
  empresa: string;
  tipo_documento: 'DNI' | 'RUC';
  numero_documento: string;
  telefono: string;
  email: string;
  pedidos: Pedido[];
}

const ClientesConPedidos = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState<'todos' | 'clientes' | 'empresas'>('todos');
  const [pagina, setPagina] = useState(1);
  const [expandir, setExpandir] = useState<{ [id: number]: boolean }>({});
  const [tab, setTab] = useState<'pendiente' | 'atendiendo' | 'atendido'>('pendiente');
  const porPagina = 6;

  useEffect(() => {
    axios.get('/api/clientes/1')
      .then(res => setClientes(res.data))
      .catch(err => console.error(err));
  }, []);

  const toggleExpandir = (id: number) => {
    setExpandir(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const actualizarEstadoPedido = async (pedidoId: number, nuevoEstado: string) => {
    try {
      await axios.put(`/api/pedidos/${pedidoId}/estado`, { estado: nuevoEstado });
      setClientes(prev =>
        prev.map(cliente => ({
          ...cliente,
          pedidos: cliente.pedidos.map(p =>
            p.id_pedido === pedidoId ? { ...p, estado: nuevoEstado as Pedido['estado'] } : p
          )
        }))
      );
    } catch (err) {
      console.error('Error actualizando estado:', err);
    }
  };

  const estadoColors: Record<string, string> = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    atendiendo: 'bg-blue-100 text-blue-800',
    atendido: 'bg-green-100 text-green-800'
  };

  const filtrarClientes = (): Cliente[] => {
    return clientes
      .filter(c => {
        if (filtro === 'clientes') return c.tipo_documento === 'DNI';
        if (filtro === 'empresas') return c.tipo_documento === 'RUC';
        return true;
      })
      .filter(c => {
        const q = busqueda.toLowerCase();
        return c.nombre?.toLowerCase().includes(q) || c.empresa?.toLowerCase().includes(q);
      });
  };

  const clientesFiltrados = filtrarClientes();

  const clientesConEstado = clientesFiltrados.filter(c =>
    c.pedidos.some(p => p.estado === tab)
  );

  const totalPaginas = Math.ceil(clientesConEstado.length / porPagina);
  const visibles = clientesConEstado.slice((pagina - 1) * porPagina, pagina * porPagina);

  

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <select
            value={filtro}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFiltro(e.target.value as typeof filtro);
              setPagina(1);
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="todos">Todos</option>
            <option value="clientes">Solo Clientes (DNI)</option>
            <option value="empresas">Solo Empresas (RUC)</option>
          </select>
          <span className="text-sm text-gray-600">{clientesFiltrados.length} registros</span>
        </div>
        <input
          className="border px-3 py-2 rounded w-full sm:w-64"
          placeholder="Buscar por nombre o empresa"
          value={busqueda}
          onChange={e => { setBusqueda(e.target.value); setPagina(1); }}
        />
      </div>

      {/* Tabs por estado con efecto hover y responsive */}
      <div className="flex flex-wrap justify-center sm:justify-start mb-4 gap-2 text-sm font-semibold">
        {(['pendiente', 'atendiendo', 'atendido'] as const).map(estado => (
          <button
            key={estado}
            onClick={() => { setTab(estado); setPagina(1); }}
            className={`px-4 py-1 rounded transition duration-200 ${tab === estado ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white'}`}
          >
            {estado.charAt(0).toUpperCase() + estado.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {visibles.map(cliente => {
          const expandido = expandir[cliente.id_cliente];
          const pedidosFiltrados = cliente.pedidos.filter(p => p.estado === tab);
          return (
            <div key={cliente.id_cliente} className="bg-white border rounded-xl shadow p-4 hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-indigo-700">
                {cliente.tipo_documento === 'DNI' ? cliente.nombre : cliente.empresa}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {cliente.tipo_documento} - {cliente.numero_documento}
              </p>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Email:</strong> {cliente.email}</p>
                <p><strong>Teléfono:</strong> {cliente.telefono}</p>
              </div>
              <div className="mt-2 flex gap-4 text-indigo-600 text-lg">
                {cliente.telefono && (
                  <>
                    <a href={`tel:${cliente.telefono}`} title="Llamar"><FaPhone /></a>
                    <a href={`https://wa.me/${cliente.telefono}`} target="_blank" title="WhatsApp" rel="noreferrer"><FaWhatsapp /></a>
                  </>
                )}
                {cliente.email && (
                  <a href={`mailto:${cliente.email}`} title="Correo"><FaEnvelope /></a>
                )}
              </div>
              <button
                onClick={() => toggleExpandir(cliente.id_cliente)}
                className="text-blue-600 text-sm mt-3 hover:underline"
              >
                {expandido ? 'Ver menos ▲' : 'Ver más ▼'}
              </button>
              {expandido && (
                <div className="mt-3">
                  <h4 className="font-semibold text-sm text-gray-700">Pedidos:</h4>
                  {pedidosFiltrados.map(pedido => (
                    <div key={pedido.id_pedido} className="mt-2 bg-gray-50 p-2 rounded shadow-sm text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <p><strong>ID:</strong> #{pedido.id_pedido}</p>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${estadoColors[pedido.estado]}`}>
                          {pedido.estado}
                        </span>
                      </div>
                      <label className="text-xs block text-gray-600 mb-1">Cambiar estado:</label>
                      <select
                        value={pedido.estado}
                        onChange={(e) => actualizarEstadoPedido(pedido.id_pedido, e.target.value)}
                        className="text-xs border rounded px-2 py-1 mb-2"
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="atendiendo">Atendiendo</option>
                        <option value="atendido">Atendido</option>
                      </select>
                      <ul className="ml-2 space-y-1">
                        {pedido.detalles.map((d, idx) => (
                          <li key={idx}>
                            🛒 {d.producto?.nombre ?? 'Producto eliminado'} — {d.cantidad} x S/
                            {Number(d.precio_unitario).toFixed(2)} = <strong>S/ {Number(d.subtotal).toFixed(2)}</strong>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-between text-sm">
        <button
          onClick={() => setPagina(p => Math.max(1, p - 1))}
          disabled={pagina === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
        >Anterior</button>
        <span>Página {pagina} de {totalPaginas}</span>
        <button
          onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
          disabled={pagina === totalPaginas}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
        >Siguiente</button>
      </div>
    </div>
  );
};

export default ClientesConPedidos;
