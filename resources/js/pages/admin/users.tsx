// resources/js/pages/admin/Users.jsx
import React from 'react';
import AdminLayout from '../../layouts/layout-admin';

function Users() {
  return (
    <AdminLayout title="Usuarios" description="Gestión de usuarios del sistema.">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Usuarios</h2>
      <p>Aquí irá la tabla de usuarios, filtros, opciones de añadir/editar/eliminar.</p>
      {/* Tabla de usuarios, formularios, etc. */}
    </AdminLayout>
  );
}

export default Users;
