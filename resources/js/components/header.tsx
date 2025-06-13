import React, { useState, useRef, useEffect } from 'react';
import { FaPhone, FaUserCircle, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar cambio de tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) setActiveSubmenu(null);
  };

  const handleSubmenuHover = (menu: string) => {
    if (!isMobile) setActiveSubmenu(menu);
  };

  const handleSubmenuLeave = () => {
    if (!isMobile) setActiveSubmenu(null);
  };

  const handleMobileSubmenuClick = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  // Animación de ola
  const waveVariants = {
    hidden: {
      clipPath: 'circle(0% at 100% 0%)',
      transition: { duration: 0.5 }
    },
    visible: {
      clipPath: 'circle(150% at 100% 0%)',
      transition: {
        duration: 0.7,
        ease: [0.65, 0, 0.35, 1]
      }
    }
  };

  return (
    <header
      className="bg-gradient-to-r from-gray-900 to-blue-900 text-white shadow-lg fixed w-full z-50"
      ref={headerRef}
    >
      {/* Barra superior de contacto */}
      <div className="bg-black bg-opacity-30 py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="tel:911883621" className="flex items-center hover:text-blue-300 transition-colors duration-200">
              <FaPhone className="mr-2" /> 911 883 621
            </a>
            <a href="tel:931800966" className="flex items-center hover:text-blue-300 transition-colors duration-200">
              <FaPhone className="mr-2" /> 931 800 966
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="#contacto" className="hover:text-blue-300 transition-colors duration-200">Contacto</a>
            <a href="#clientes" className="flex items-center hover:text-blue-300 transition-colors duration-200">
              <FaUserCircle className="mr-1" /> Zona de clientes
            </a>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold flex items-center hover:opacity-90 transition-opacity duration-200">
              <span className="bg-blue-500 text-white p-2 rounded mr-2">VISUALLED</span>
              <span className="hidden md:inline">Tecnología LED</span>
            </a>
          </div>

          {/* Menú para desktop */}
          <nav className="hidden md:flex space-x-1">
            <a href="#inicio" className="px-4 py-2 hover:bg-blue-700 hover:bg-opacity-50 rounded-lg transition-all duration-200 flex items-center">
              Inicio
            </a>

            <div
              className="relative"
              onMouseEnter={() => handleSubmenuHover('productos')}
              onMouseLeave={handleSubmenuLeave}
            >
              <a
                href="#productos"
                className="px-4 py-2 hover:bg-blue-700 hover:bg-opacity-50 rounded-lg transition-all duration-200 flex items-center"
              >
                Productos <FaChevronDown className="ml-1 text-xs" />
              </a>
              <div className={`absolute left-0 mt-0 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 ${activeSubmenu === 'productos' ? 'block' : 'hidden'}`}>
                <a href="#pantallas-led" className="block px-4 py-2 hover:bg-blue-600 transition-colors duration-200">Pantallas LED publicitarias</a>
                <a href="#escaparates" className="block px-4 py-2 hover:bg-blue-600 transition-colors duration-200">Pantallas escaparates</a>
                <a href="#soluciones" className="block px-4 py-2 hover:bg-blue-600 transition-colors duration-200">Soluciones personalizadas</a>
              </div>
            </div>

            <a href="#nosotros" className="px-4 py-2 hover:bg-blue-700 hover:bg-opacity-50 rounded-lg transition-all duration-200">
              Nosotros
            </a>

            <div
              className="relative"
              onMouseEnter={() => handleSubmenuHover('informacion')}
              onMouseLeave={handleSubmenuLeave}
            >
              <a
                href="#informacion"
                className="px-4 py-2 hover:bg-blue-700 hover:bg-opacity-50 rounded-lg transition-all duration-200 flex items-center"
              >
                Información <FaChevronDown className="ml-1 text-xs" />
              </a>
              <div className={`absolute left-0 mt-0 w-56 bg-gray-800 rounded-md shadow-lg py-1 z-10 ${activeSubmenu === 'informacion' ? 'block' : 'hidden'}`}>
                <a href="#blog" className="block px-4 py-2 hover:bg-blue-600 transition-colors duration-200">Blog técnico</a>
                <a href="#faq" className="block px-4 py-2 hover:bg-blue-600 transition-colors duration-200">Preguntas frecuentes</a>
                <a href="#guias" className="block px-4 py-2 hover:bg-blue-600 transition-colors duration-200">Guías de instalación</a>
                <a href="#soporte" className="block px-4 py-2 hover:bg-blue-600 transition-colors duration-200">Soporte técnico</a>
              </div>
            </div>

            <a href="#sectores" className="px-4 py-2 hover:bg-blue-700 hover:bg-opacity-50 rounded-lg transition-all duration-200">
              Sectores
            </a>
          </nav>

          {/* Botón móvil */}
          <button
            className="md:hidden text-white focus:outline-none hover:text-blue-300 transition-colors duration-200 z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menú móvil con efecto de ola */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden fixed inset-0 bg-gradient-to-br from-blue-900 to-gray-900 pt-20 pb-10 px-6 overflow-y-auto"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={waveVariants}
              style={{ originX: 1, originY: 0 }}
            >
              <div className="flex flex-col space-y-4">
                <a
                  href="#inicio"
                  className="text-xl py-4 px-4 hover:bg-blue-700 rounded transition-colors duration-200 border-b border-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </a>

                <div className="border-b border-blue-800">
                  <div
                    className="flex justify-between items-center text-xl py-4 px-4 hover:bg-blue-700 rounded transition-colors duration-200 cursor-pointer"
                    onClick={() => handleMobileSubmenuClick('mobile-productos')}
                  >
                    <span>Productos</span>
                    <FaChevronDown className={`transition-transform duration-200 ${activeSubmenu === 'mobile-productos' ? 'transform rotate-180' : ''}`} />
                  </div>
                  <div className={`${activeSubmenu === 'mobile-productos' ? 'block' : 'hidden'} pl-6 bg-blue-900 bg-opacity-30 rounded-lg my-2`}>
                    <a
                      href="#pantallas-led"
                      className="block py-3 px-4 hover:bg-blue-800 rounded transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Pantallas LED publicitarias
                    </a>
                    <a
                      href="#escaparates"
                      className="block py-3 px-4 hover:bg-blue-800 rounded transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Pantallas escaparates
                    </a>
                    <a
                      href="#soluciones"
                      className="block py-3 px-4 hover:bg-blue-800 rounded transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Soluciones personalizadas
                    </a>
                  </div>
                </div>

                <a
                  href="#nosotros"
                  className="text-xl py-4 px-4 hover:bg-blue-700 rounded transition-colors duration-200 border-b border-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nosotros
                </a>

                <div className="border-b border-blue-800">
                  <div
                    className="flex justify-between items-center text-xl py-4 px-4 hover:bg-blue-700 rounded transition-colors duration-200 cursor-pointer"
                    onClick={() => handleMobileSubmenuClick('mobile-informacion')}
                  >
                    <span>Información</span>
                    <FaChevronDown className={`transition-transform duration-200 ${activeSubmenu === 'mobile-informacion' ? 'transform rotate-180' : ''}`} />
                  </div>
                  <div className={`${activeSubmenu === 'mobile-informacion' ? 'block' : 'hidden'} pl-6 bg-blue-900 bg-opacity-30 rounded-lg my-2`}>
                    <a
                      href="#blog"
                      className="block py-3 px-4 hover:bg-blue-800 rounded transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Blog técnico
                    </a>
                    <a
                      href="#faq"
                      className="block py-3 px-4 hover:bg-blue-800 rounded transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Preguntas frecuentes
                    </a>
                    <a
                      href="#guias"
                      className="block py-3 px-4 hover:bg-blue-800 rounded transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Guías de instalación
                    </a>
                    <a
                      href="#soporte"
                      className="block py-3 px-4 hover:bg-blue-800 rounded transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Soporte técnico
                    </a>
                  </div>
                </div>

                <a
                  href="#sectores"
                  className="text-xl py-4 px-4 hover:bg-blue-700 rounded transition-colors duration-200 border-b border-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sectores
                </a>

                <div className="mt-6 pt-6 border-t border-blue-700">
                  <a
                    href="tel:911883621"
                    className="flex items-center text-lg py-3 px-4 hover:bg-blue-700 rounded transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaPhone className="mr-3" /> 911 883 621
                  </a>
                  <a
                    href="tel:931800966"
                    className="flex items-center text-lg py-3 px-4 hover:bg-blue-700 rounded transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaPhone className="mr-3" /> 931 800 966
                  </a>
                  <a
                    href="#contacto"
                    className="block text-lg py-3 px-4 hover:bg-blue-700 rounded transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contacto
                  </a>
                  <a
                    href="#clientes"
                    className="flex items-center text-lg py-3 px-4 hover:bg-blue-700 rounded transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUserCircle className="mr-3" /> Zona de clientes
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
