// resources/js/pages/admin/Dashboard.jsx
import React from 'react';
import AdminLayout from '../../layouts/layout-admin'; // Ruta correcta al layout

function Dashboard() {
  return (
    <AdminLayout title="Dashboard" description="Vista general del panel de administración.">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Estadísticas</h3>
          <p>Gráficos de ventas, usuarios, etc.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Actividad Reciente</h3>
          <p>Lista de acciones recientes.</p>
        </div>
        {/* Más tarjetas de información */}
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
