import React, { useState } from 'react';
import AdminHeader from "../components/admin/header-admin";
import AdminSidebar from "../components/admin/sidebar-admin";
import { Helmet } from 'react-helmet-async';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

function AdminLayout({ children, title = "Admin Panel", description = "Panel de Administración" }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{title ? `${title} | Admin Panel` : 'Admin Panel'}</title>
        <meta name="description" content={description} />
      </Helmet>

      <AdminHeader toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`flex-1 p-6 bg-gray-100 transition-all duration-300 ${sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
