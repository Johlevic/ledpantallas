import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faTachometerAlt,
  faUsers,
  faBoxes,
  faCog,
  faChartBar,
  faFileAlt,
  faShoppingCart,
  faTags,
  faUserCog,
  faComments,
  faChevronDown,
  faChevronRight,
  faDatabase
} from '@fortawesome/free-solid-svg-icons';

interface SubMenuItem {
  title: string;
  path: string;
}

interface MenuItem {
  title: string;
  path: string;
  icon: IconDefinition;
  submenu?: SubMenuItem[];
  open?: boolean;
}

interface AdminSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

function AdminSidebar({ isOpen, toggleSidebar }: AdminSidebarProps) {
  const location = useLocation();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
      icon: faTachometerAlt
    },
    {
      title: 'Usuarios',
      path: '/admin/users',
      icon: faUserCog,
      submenu: [
        { title: 'Lista de Usuarios', path: '/admin/users/list' },
        { title: 'Roles', path: '/admin/users/roles' },
        { title: 'Permisos', path: '/admin/users/permissions' }
      ],
      open: false
    },
    {
      title: 'Productos',
      path: '/admin/products',
      icon: faBoxes,
      submenu: [
        { title: 'Todos los Productos', path: '/admin/productos' },
        { title: 'Categorías', path: '/admin/products/categories' },
        { title: 'Inventario', path: '/admin/products/inventory' }
      ],
      open: false
    },
    {
      title: 'Pedidos',
      path: '/admin/pedidos',
      icon: faShoppingCart
    },
    {
      title: 'Clientes',
      path: '/admin/clientes',
      icon: faUsers
    },
    {
      title: 'Reportes',
      path: '/admin/reports',
      icon: faChartBar,
      submenu: [
        { title: 'Ventas', path: '/admin/reports/sales' },
        { title: 'Usuarios', path: '/admin/reports/users' },
        { title: 'Productos', path: '/admin/reports/products' }
      ],
      open: false
    },
    {
      title: 'Contenido',
      path: '/admin/content',
      icon: faFileAlt,
      submenu: [
        { title: 'Páginas', path: '/admin/content/pages' },
        { title: 'Blog', path: '/admin/content/blog' },
        { title: 'Media', path: '/admin/content/media' }
      ],
      open: false
    },
    {
      title: 'Configuración',
      path: '/admin/settings',
      icon: faCog,
      submenu: [
        { title: 'General', path: '/admin/settings/general' },
        { title: 'Correo', path: '/admin/settings/email' },
        { title: 'API', path: '/admin/settings/api' }
      ],
      open: false
    }
  ]);

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && !isOpen) {
        toggleSidebar();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, toggleSidebar]);

  useEffect(() => {
    document.body.style.overflow = isOpen && isMobile ? 'hidden' : 'auto';
  }, [isOpen]);

  const toggleSubmenu = (index: number) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index].open = !updatedMenuItems[index].open;
    setMenuItems(updatedMenuItems);
  };

  useEffect(() => {
    const updatedMenuItems = menuItems.map(item => {
      if (item.submenu) {
        const shouldOpen = item.submenu.some(subItem =>
          location.pathname.startsWith(subItem.path) || location.pathname.startsWith(item.path)
        );
        return { ...item, open: shouldOpen };
      }
      return item;
    });
    setMenuItems(updatedMenuItems);
  }, [location.pathname]);

  return (
    <>
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-gradient-to-r from-black/50 to-transparent z-30"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed md:static z-40 bg-gray-800 text-white w-64 min-h-screen transition-all duration-300 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={item.path}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className={`w-full flex items-center justify-between p-2 rounded hover:bg-gray-700 ${location.pathname.startsWith(item.path) ? 'bg-gray-700' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={item.icon} className="w-4 text-gray-400" />
                        <span>{item.title}</span>
                      </div>
                      <FontAwesomeIcon
                        icon={item.open ? faChevronDown : faChevronRight}
                        className="text-xs text-gray-400"
                      />
                    </button>
                    {item.open && (
                      <ul className="ml-6 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.path}>
                            <Link
                              to={subItem.path}
                              className={`block p-2 rounded hover:bg-gray-700 text-sm ${location.pathname === subItem.path ? 'bg-gray-700 text-yellow-400' : 'text-gray-300'}`}
                              onClick={(e) => {
                                if (location.pathname === subItem.path) {
                                  e.preventDefault();
                                  window.location.reload(); // fuerza recarga si es la misma ruta
                                } else if (isMobile) {
                                  toggleSidebar();
                                }
                              }}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${location.pathname === item.path ? 'bg-gray-700 text-yellow-400' : ''}`}
                    onClick={(e) => {
                      if (location.pathname === item.path) {
                        e.preventDefault();
                        window.location.reload();
                      } else if (isMobile) {
                        toggleSidebar();
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-4 text-gray-400" />
                    <span>{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-4 border-t border-gray-700">
            <h3 className="text-xs uppercase text-gray-400 font-semibold mb-2 px-2">Sistema</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 text-gray-300">
                  <FontAwesomeIcon icon={faDatabase} className="w-4 text-gray-400" />
                  <span>Backups</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 text-gray-300">
                  <FontAwesomeIcon icon={faComments} className="w-4 text-gray-400" />
                  <span>Soporte</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 text-gray-300">
                  <FontAwesomeIcon icon={faTags} className="w-4 text-gray-400" />
                  <span>Licencia</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default AdminSidebar;
