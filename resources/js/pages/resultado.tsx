import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FiAlertCircle, FiCheckCircle, FiLoader } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../layouts/layout';

interface CalculoState {
  dimensiones: {
    largo: number;
    alto: number;
  };
  producto: {
    id_producto: number;
    nombre: string;
    tipo_instalacion: 'interior' | 'exterior';
    tipo: '3p' | '5p' | '8p';
    precio_por_m2: number;
    precio_oferta?: number;
    stock: number;
  };
  calculo: {
    areaM2: number;
    precioPorM2: number;
    precioTotal: number;
    tipoInstalacion: string;
    tipoLed: string;
  };
}

const Resultado: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as CalculoState;

  // Extraemos los datos con valores por defecto
  const { dimensiones = { largo: 0, alto: 0 }, producto, calculo = {
    areaM2: 0,
    precioPorM2: 0,
    precioTotal: 0,
    tipoInstalacion: '',
    tipoLed: ''
  } } = state || {};

  const { largo, alto } = dimensiones;
  const { tipoInstalacion: tipo, tipoLed, precioTotal, areaM2, precioPorM2 } = calculo;

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    tipo_documento: 'DNI',
    numero_documento: '',
    telefono: '',
    comentario: '',
  });

  // Validación del estado
  if (!state || !dimensiones || !calculo || !producto) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
            <h2 className="text-xl font-semibold text-red-600">Datos incompletos</h2>
            <button
              className="mt-4 rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
              onClick={() => navigate('/')}
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Convertir metros a milímetros para mostrar
  const largoM = (largo * 1000).toFixed(0);
  const altoM = (alto * 1000).toFixed(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           ...formData,
            largo: dimensiones.largo,
            alto: dimensiones.alto,
            tipoLed: calculo.tipoLed,
            tipo: calculo.tipoInstalacion,
            areaM2: calculo.areaM2,
            precioFinal: calculo.precioTotal
        }),
      });



      if (response.ok) {
        toast.success('¡Solicitud enviada con éxito! Nos contactaremos pronto.', {
          icon: <FiCheckCircle />,
        });
        setShowModal(false);
        setFormData({
          nombre: '',
          empresa: '',
          email: '',
          tipo_documento: 'DNI',
          numero_documento: '',
          telefono: '',
          comentario: '',
        });
      } else {
        const errorData = await response.json();
        console.error('Error desde Laravel:', errorData);
        toast.error('Error: ' + (errorData.message || 'Error al enviar la solicitud'), {
          icon: <FiAlertCircle />,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error de red. No se pudo enviar el formulario.', {
        icon: <FiAlertCircle />,
      });
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: '14px',
            padding: '12px 24px',
          },
        }}
      />

      {/* Overlay de carga */}
      {isSubmitting && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/70 text-white backdrop-blur-md">
          <FiLoader className="mb-4 h-14 w-14 animate-spin text-blue-400" />
          <p className="text-2xl font-bold">Procesando tu solicitud...</p>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        {/* Sección principal */}
        <div className="container mx-auto py-10 px-4 pt-[10%]">
          <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
            {/* Imagen del producto */}
            <figure className="w-full max-w-lg">
              <figcaption className="mb-4 text-center text-2xl font-bold text-gray-800">
                PANTALLA LED {largoM} x {altoM} mm
              </figcaption>
              <div className="overflow-hidden rounded-lg border border-gray-300 shadow-lg">
                <img
                  src="https://pantallasledperu.com/wp-content/uploads/2020/09/295.jpg"
                  alt="Pantalla LED"
                  className="w-full transition-transform duration-300 hover:scale-105"
                />
              </div>
            </figure>

            {/* Resultados del cálculo */}
            <div className="relative w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-md">
              <div className="absolute -top-4 left-4 rounded-full bg-red-500 px-4 py-1 text-sm font-semibold text-white shadow-md">
                ¡OFERTA ESPECIAL!
              </div>

              <h2 className="mb-4 text-2xl font-extrabold text-blue-800">Resultado del Cálculo</h2>

              <div className="mb-4 space-y-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <InfoItem icon="M20 12H4" label="Dimensiones" value={`${largoM} mm x ${altoM} mm`} />
                <InfoItem icon="M4 6h16M4 10h16M4 14h16M4 18h16" label="Área" value={`${areaM2.toFixed(2)} m²`} />
                <InfoItem
                  icon="M12 4v16m8-8H4"
                  label="Tipo de instalación"
                  value={tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                />
                <InfoItem icon="M13 10V3L4 14h7v7l9-11h-7z" label="Tipo de LED" value={tipoLed.toUpperCase()} />
              </div>

              <hr className="my-4 border-gray-300" />

              {/* Precios */}
              <div className="mb-6">
                <p className="text-lg text-gray-500 line-through">
                  Precio normal: ${Math.round(precioTotal * 1.25)} USD
                </p>
                <p className="mt-2 rounded-md bg-green-50 py-2 text-2xl font-bold text-green-600 shadow-inner">
                  ¡Solo hoy: ${precioTotal.toFixed(2)} USD!
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  (Precio por m²: ${precioPorM2} USD)
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <button
                  className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-medium text-white shadow-md transition hover:bg-blue-700"
                  onClick={() => setShowModal(true)}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                  Solicitar presupuesto
                </button>
                <button
                  className="rounded-full border border-gray-300 bg-white px-6 py-3 text-gray-800 transition hover:bg-gray-100"
                  onClick={() => navigate('/')}
                >
                  Calcular otro
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Contacto */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-xl">
              {/* Encabezado */}
              <div className="flex items-center justify-between rounded-t-xl bg-blue-600 p-5 text-white">
                <div>
                  <h3 className="text-2xl font-semibold">Solicitar Presupuesto</h3>
                  <p className="text-sm opacity-90">Complete el formulario y nos contactaremos con usted</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="h-10 w-10 rounded-full text-white transition hover:bg-blue-700"
                  aria-label="Cerrar modal"
                >
                  <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Tipo de documento */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">Tipo de documento*</label>
                    <div className="flex gap-4">
                      {['DNI', 'RUC'].map((tipoDoc) => (
                        <label key={tipoDoc} className="flex-1">
                          <input
                            type="radio"
                            name="tipo_documento"
                            value={tipoDoc}
                            checked={formData.tipo_documento === tipoDoc}
                            onChange={handleInputChange}
                            className="peer hidden"
                            required
                          />
                          <div className="w-full cursor-pointer rounded-lg border p-3 text-center transition-all peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white">
                            {tipoDoc}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Nombre o Empresa según tipo de documento */}
                  {formData.tipo_documento === 'DNI' ? (
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-gray-700">Nombre completo*</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Juan Pérez"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-gray-700">Empresa*</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="empresa"
                          value={formData.empresa}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Mi Empresa SAC"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Número de documento */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      {formData.tipo_documento === 'DNI' ? 'DNI*' : 'RUC*'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="numero_documento"
                        value={formData.numero_documento}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder={formData.tipo_documento === 'DNI' ? '12345678' : '12345678901'}
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Teléfono</label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="987654321"
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Email*</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="correo@example.com"
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Comentario */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">Comentario</label>
                    <textarea
                      name="comentario"
                      value={formData.comentario}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Detalles adicionales sobre tu proyecto..."
                    ></textarea>
                  </div>
                </div>

                {/* Mensaje de privacidad */}
                <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
                  <p className="flex items-start">
                    <svg
                      className="mr-2 h-5 w-5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Tus datos son confidenciales y solo serán utilizados para contactarte con respecto a tu solicitud.
                  </p>
                </div>

                {/* Botones del formulario */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100"
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex items-center gap-2 rounded-lg px-5 py-2 text-white transition ${
                      loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {loading ? (
                      <>
                        <FiLoader className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Enviar solicitud
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Sección de características */}
        <section className="bg-gray-50 py-10">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-2xl font-bold text-blue-700">Características del Producto</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

// Componente auxiliar para items de información
const InfoItem: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <p className="flex items-center gap-2">
    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
    </svg>
    <span>
      <strong>{label}:</strong> {value}
    </span>
  </p>
);

// Componente auxiliar para tarjetas de características
// Mover esta parte ANTES del componente Resultado
const FeatureCard: React.FC<{ title: string; img: string; items: string[] }> = ({ title, img, items }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg">
    <img src={img} alt={title} className="mb-4 h-40 w-full rounded-lg object-cover" />
    <h3 className="mb-4 text-lg font-semibold text-blue-800">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  </div>
);




// Datos de características
const features = [
  {
    title: 'REPRODUCTOR DE VÍDEO',
    img: 'https://visualled.com/img/player-lcd.webp',
    items: [
      'Reproductor profesional',
      'Acceso remoto (wifi/ethernet)',
      'Tamaño ultra reducido',
      'Regulación automática',
      'Funcionamiento 24/7',
    ],
  },
  {
    title: 'SOFTWARE DE GESTIÓN',
    img: 'https://visualled.com/img/software-smartphone.webp',
    items: [
      'Gestión remota de contenidos',
      'Reproducción programada',
      'Encendido/apagado programable',
      'Interfaz amigable',
    ],
  },
  {
    title: 'SERVICIOS INCLUIDOS',
    img: 'https://visualled.com/img/servicios.webp',
    items: [
      'Formación incluida',
      'Asistencia técnica remota',
      'Documentación completa',
      'Portal para clientes',
    ],
  },
];

export default Resultado;
