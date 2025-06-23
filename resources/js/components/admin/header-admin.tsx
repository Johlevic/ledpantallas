import {
    faBars,
    faBell,
    faCog,
    faEnvelope,
    faLanguage,
    faMoon,
    faQuestionCircle,
    faSearch,
    faSignOutAlt,
    faSun,
    faTimes,
    faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';

interface Notification {
    id: number;
    message: string;
    type: 'message' | 'warning' | 'success';
    read: boolean;
    timestamp: string;
}

interface AdminHeaderProps {
    toggleSidebar: () => void;
}

function AdminHeader({ toggleSidebar }: AdminHeaderProps) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showMobileProfileMenu, setShowMobileProfileMenu] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [unreadCount, setUnreadCount] = useState(3);
    const [searchQuery, setSearchQuery] = useState('');
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: 1, message: 'Nuevo mensaje de usuario', type: 'message', read: false, timestamp: '10 min ago' },
        { id: 2, message: 'Mantenimiento programado', type: 'warning', read: false, timestamp: '1 hora ago' },
        { id: 3, message: 'Actualización completada', type: 'success', read: false, timestamp: '2 horas ago' },
        { id: 4, message: 'Nuevo registro de usuario', type: 'message', read: true, timestamp: '1 día ago' },
    ]);

    const notifRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const mobileProfileMenuRef = useRef<HTMLDivElement>(null);

    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Cerrar notificaciones si se hace clic fuera
            if (notifRef.current && !notifRef.current.contains(event.target as Node) &&
                !(event.target as Element).closest('[data-notification-button]')) {
                setShowNotifications(false);
            }

            // Cerrar perfil si se hace clic fuera
            if (profileRef.current && !profileRef.current.contains(event.target as Node) &&
                !(event.target as Element).closest('[data-profile-button]')) {
                setShowProfile(false);
            }

            // Cerrar menú móvil si se hace clic fuera
            if (mobileProfileMenuRef.current && !mobileProfileMenuRef.current.contains(event.target as Node) &&
                !(event.target as Element).closest('[data-mobile-menu-button]')) {
                setShowMobileProfileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 60) {
                setIsScrollingUp(false); // scroll down
            } else {
                setIsScrollingUp(true); // scroll up
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    const markAsRead = (id: number) => {
        const updatedNotifs = notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif));
        setNotifications(updatedNotifs);
        setUnreadCount(updatedNotifs.filter((n) => !n.read).length);
    };

    const markAllAsRead = () => {
        const updatedNotifs = notifications.map((notif) => ({ ...notif, read: true }));
        setNotifications(updatedNotifs);
        setUnreadCount(0);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    const toggleMobileProfileMenu = () => {
        setShowMobileProfileMenu(!showMobileProfileMenu);
    };

    return (
        <>
            <header
                className={`${
                    darkMode ? 'dark bg-gray-900' : 'bg-gray-800'
                } sticky top-0 z-50 flex items-center justify-between p-4 text-white shadow-md transition-transform duration-300 ${
                    isScrollingUp ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <div className="flex items-center gap-4">
                    {/* Botón de hamburguesa solo para móviles */}
                    <button className="p-2 text-xl md:hidden" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    <div className="flex items-center gap-2 text-2xl font-bold">
                        <FontAwesomeIcon icon={faUserCircle} className="text-yellow-400" />
                        <span className="hidden sm:inline">Panel Admin</span>
                        <span className="sm:hidden">Admin</span>
                    </div>
                </div>

                {/* Menú desktop - se oculta en móviles */}
                <div className="relative hidden items-center gap-4 md:flex">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-64 rounded-full bg-gray-700 py-2 pr-4 pl-10 text-white placeholder-gray-300 transition-all duration-300 hover:w-72 focus:w-72 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />
                        <FontAwesomeIcon icon={faSearch} className="absolute top-3 left-3 text-gray-300" />
                    </form>

                    <button
                        className="p-2 hover:text-yellow-400"
                        onClick={toggleDarkMode}
                        title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                    >
                        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                    </button>

                    <button className="p-2 hover:text-yellow-400" title="Mensajes">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </button>

                    {/* Notificaciones */}
                    <div className="relative" ref={notifRef}>
                        <button
                            onClick={() => {
                                setShowNotifications(!showNotifications);
                                if (!showNotifications && unreadCount > 0) {
                                    markAllAsRead();
                                }
                            }}
                            className="relative p-2 hover:text-yellow-400"
                            title="Notificaciones"
                        >
                            <FontAwesomeIcon icon={faBell} />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                        {showNotifications && (
                            <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-lg bg-white text-black shadow-xl dark:bg-gray-800 dark:text-white">
                                <div className="flex items-center justify-between border-b border-gray-200 p-3 dark:border-gray-700">
                                    <h4 className="font-semibold">Notificaciones</h4>
                                    <button onClick={markAllAsRead} className="text-xs text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
                                        Marcar todas como leídas
                                    </button>
                                </div>
                                <ul className="max-h-80 overflow-y-auto">
                                    {notifications.map((notif) => (
                                        <li
                                            key={notif.id}
                                            className={`cursor-pointer border-b border-gray-100 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 ${!notif.read ? 'bg-blue-50 dark:bg-gray-900' : ''}`}
                                            onClick={() => markAsRead(notif.id)}
                                        >
                                            <div className="flex items-start gap-2">
                                                <div
                                                    className={`mt-1 h-2 w-2 rounded-full ${
                                                        notif.type === 'message'
                                                            ? 'bg-blue-500'
                                                            : notif.type === 'warning'
                                                              ? 'bg-yellow-500'
                                                              : 'bg-green-500'
                                                    } ${notif.read ? 'opacity-0' : ''}`}
                                                ></div>
                                                <div>
                                                    <p className="text-sm">{notif.message}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{notif.timestamp}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t border-gray-200 p-3 text-center dark:border-gray-700">
                                    <a href="#" className="text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
                                        Ver todas las notificaciones
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Idioma */}
                    <div className="group relative">
                        <button className="p-2 hover:text-yellow-400" title="Cambiar idioma">
                            <FontAwesomeIcon icon={faLanguage} />
                        </button>
                        <div className="absolute right-0 z-50 mt-2 hidden w-32 rounded-lg bg-white p-2 text-black shadow-lg group-hover:block dark:bg-gray-800 dark:text-white">
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <button className="w-full text-left hover:text-yellow-600 dark:hover:text-yellow-400">Español</button>
                                </li>
                                <li>
                                    <button className="w-full text-left hover:text-yellow-600 dark:hover:text-yellow-400">English</button>
                                </li>
                                <li>
                                    <button className="w-full text-left hover:text-yellow-600 dark:hover:text-yellow-400">Português</button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Ayuda */}
                    <a href="#" className="p-2 hover:text-yellow-400" title="Ayuda">
                        <FontAwesomeIcon icon={faQuestionCircle} />
                    </a>

                    {/* Perfil */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className="flex items-center gap-1 p-2 hover:text-yellow-400"
                            title="Perfil"
                        >
                            <div className="relative">
                                <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
                                <span className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-xs text-white"></span>
                            </div>
                            <span className="hidden lg:inline">Admin User</span>
                        </button>
                        {showProfile && (
                            <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg bg-white text-black shadow-xl dark:bg-gray-800 dark:text-white">
                                <div className="flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-700">
                                    <FontAwesomeIcon icon={faUserCircle} className="text-3xl text-yellow-500" />
                                    <div>
                                        <p className="font-semibold">Admin User</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
                                    </div>
                                </div>
                                <ul className="py-1">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                                            Mi perfil
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <FontAwesomeIcon icon={faCog} className="mr-2" />
                                            Configuración
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
                                            Ayuda
                                        </a>
                                    </li>
                                </ul>
                                <div className="border-t border-gray-200 py-1 dark:border-gray-700">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                                    >
                                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                        Cerrar sesión
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Botón de perfil para móviles */}
                <button className="flex items-center gap-1 p-2 hover:text-yellow-400 md:hidden" onClick={toggleMobileProfileMenu} title="Perfil">
                    <div className="relative">
                        <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
                        <span className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-xs text-white"></span>
                    </div>
                </button>
            </header>

            {/* Menú móvil lateral derecho */}
            <div
                ref={mobileProfileMenuRef}
                className={`fixed inset-y-0 right-0 z-50 w-64 transform bg-gray-800 shadow-xl transition-transform duration-300 ease-in-out md:hidden dark:bg-gray-900 ${showMobileProfileMenu ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between border-b border-gray-700 p-4">
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faUserCircle} className="text-3xl text-yellow-500" />
                        <div>
                            <p className="font-semibold">Admin User</p>
                            <p className="text-xs text-gray-400">admin@example.com</p>
                        </div>
                    </div>
                    <button onClick={toggleMobileProfileMenu} className="text-gray-400 hover:text-white">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div className="h-[calc(100%-60px)] overflow-y-auto p-4">
                    <form onSubmit={handleSearch} className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-full bg-gray-700 py-2 pr-4 pl-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />
                        <FontAwesomeIcon icon={faSearch} className="absolute top-3 left-3 text-gray-400" />
                    </form>

                    <div className="space-y-2">
                        <button className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-gray-700">
                            <FontAwesomeIcon icon={faBell} />
                            <span>Notificaciones ({unreadCount})</span>
                        </button>
                        <button className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-gray-700">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>Mensajes</span>
                        </button>
                        <button className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-gray-700">
                            <FontAwesomeIcon icon={faCog} />
                            <span>Configuración</span>
                        </button>
                        <button className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-gray-700" onClick={toggleDarkMode}>
                            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                            <span>{darkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
                        </button>
                        <button className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-gray-700">
                            <FontAwesomeIcon icon={faLanguage} />
                            <span>Idioma</span>
                        </button>
                        <button className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-gray-700">
                            <FontAwesomeIcon icon={faQuestionCircle} />
                            <span>Ayuda</span>
                        </button>
                    </div>

                    <div className="mt-6 border-t border-gray-700 pt-4">
                        <button className="flex w-full items-center gap-3 rounded-lg p-3 text-red-400 hover:bg-gray-700">
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span>Cerrar sesión</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay cuando el menú está abierto */}
            {showMobileProfileMenu && <div className="bg-opacity-50 fixed inset-0 z-40 bg-black md:hidden" onClick={toggleMobileProfileMenu} />}
        </>
    );
}

export default AdminHeader;
