import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../layouts/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';

const Resultado: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { largo, alto, tipoLed, tipo } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    comentario: ''
  });

  if (!largo || !alto || !tipoLed || !tipo) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-xl font-semibold text-red-600">Datos incompletos</h2>
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
              onClick={() => navigate('/')}
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Convertir mm a metros y calcular área
  const largoM = largo * 1000;
  const altoM = alto * 1000;
  const areaM2 = largo * alto;

  // Precios ficticios por m²
  const precios: { [key: string]: { [key: string]: number } } = {
    interior: {
      '3p': 800,
      '5p': 600,
      '8p': 450,
    },
    exterior: {
      '3p': 950,
      '5p': 750,
      '8p': 580,
    },
  };

  const precioPorM2 = precios[tipo][tipoLed];
  const precioFinal = areaM2 * precioPorM2;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:8000/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        largo,
        alto,
        tipoLed,
        tipo,
        areaM2,
        precioFinal,
      }),
    });

    if (response.ok) {
      alert('Gracias por tu solicitud. Nos pondremos en contacto contigo pronto.');
      setShowModal(false);
    } else {
      alert('Hubo un error al enviar la información.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('No se pudo enviar el formulario.');
  }
};

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full text-center transform transition-all hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Resultado del Cálculo</h2>
          <p className="text-gray-700 mb-2">
            <strong>Dimensiones:</strong> {largoM} mm x {altoM} mm
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Área:</strong> {areaM2.toFixed(2)} m²
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Tipo de instalación:</strong> {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Tipo de LED:</strong> {tipoLed.toUpperCase()}
          </p>
          <hr className="my-4 border-t border-gray-300" />
          <p className="text-2xl font-semibold text-green-600">
            Precio estimado: ${precioFinal.toFixed(2)} USD
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full flex items-center gap-2 transition"
              onClick={() => setShowModal(true)}
            >
              <FontAwesomeIcon icon={faPaperPlane} /> Solicitar presupuesto
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-full transition"
              onClick={() => navigate('/')}
            >
              Calcular otro
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 backdrop-blur-sm bg-black/30 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative transform transition-all animate-scaleIn">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                aria-label="Cerrar modal"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Completa tus datos</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1">Persona de contacto*</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1">Empresa</label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-left text-sm font-medium text-gray-700 mb-1">Comentario</label>
                    <textarea
                      name="comentario"
                      value={formData.comentario}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Detalles adicionales sobre tu proyecto..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                  <p className="text-xs text-gray-500 text-left">
                    Estos datos SÓLO sirven para la generación del presupuesto.
                    No realizamos llamadas comerciales ni envíos de publicidad.
                  </p>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Resultado;
