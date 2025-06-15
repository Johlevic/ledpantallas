import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isMobile] = useState(() => window.innerWidth < 768);
  const [expandedSections, setExpandedSections] = useState({
    quickLinks: false,
    products: false
  });

  const toggleSection = (section: 'quickLinks' | 'products') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Animaciones
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-blue-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
        >
          {/* Columna 1: Logo y descripción */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="bg-blue-500 text-white p-2 rounded mr-2 text-xl font-bold">VISUALLED</span>
              <span className="text-xl font-bold">Tecnología LED</span>
            </div>
            <p className="text-gray-300">
              Líderes en soluciones de visualización LED para negocios y espacios públicos. Innovación y calidad desde 2010.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <button
              className={`flex items-center justify-between w-full ${isMobile ? 'cursor-pointer' : 'cursor-default'}`}
              onClick={() => isMobile && toggleSection('quickLinks')}
            >
              <h3 className="text-lg font-semibold mb-4 border-b border-blue-700 pb-2">Enlaces Rápidos</h3>
              {isMobile && (
                expandedSections.quickLinks ?
                <FaChevronUp className="text-blue-400" /> :
                <FaChevronDown className="text-blue-400" />
              )}
            </button>
            {(expandedSections.quickLinks || !isMobile) && (
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Productos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Soluciones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Proyectos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Nosotros
                  </a>
                </li>
              </ul>
            )}
          </div>

          {/* Columna 3: Productos */}
          <div>
            <button
              className={`flex items-center justify-between w-full ${isMobile ? 'cursor-pointer' : 'cursor-default'}`}
              onClick={() => isMobile && toggleSection('products')}
            >
              <h3 className="text-lg font-semibold mb-4 border-b border-blue-700 pb-2">Nuestros Productos</h3>
              {isMobile && (
                expandedSections.products ?
                <FaChevronUp className="text-blue-400" /> :
                <FaChevronDown className="text-blue-400" />
              )}
            </button>
            {(expandedSections.products || !isMobile) && (
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Pantallas LED Publicitarias
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Pantallas de Escaparate
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Pantallas Interiores
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Pantallas Exteriores
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Sistemas de Control
                  </a>
                </li>
              </ul>
            )}
          </div>

          {/* Columna 4: Contacto (siempre visible) */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-blue-700 pb-2">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-300">Calle Tecnología 123, Parque Industrial, Lima, Perú</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-blue-400 mr-3" />
                <div>
                  <a href="tel:+51911883621" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 block">+51 911 883 621</a>
                  <a href="tel:+51931800966" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 block">+51 931 800 966</a>
                </div>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-400 mr-3" />
                <a href="mailto:info@visualled.com" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">info@visualled.com</a>
              </li>
              <li className="flex items-center">
                <FaClock className="text-blue-400 mr-3" />
                <span className="text-gray-300">Lun-Vie: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Derechos de autor */}
        <div className="border-t border-blue-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} VISUALLED. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">Términos de servicio</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">Política de privacidad</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-300">Mapa del sitio</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
