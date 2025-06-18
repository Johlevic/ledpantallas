import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FiAlertCircle, FiCheckCircle, FiLoader } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../layouts/layout';

const Resultado: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { largo, alto, tipoLed, tipo } = location.state || {};
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        empresa: '',
        email: '',
        tipo_documento: 'DNI', // Por defecto
        numero_documento: '',
        telefono: '',
        comentario: '',
    });

    if (!largo || !alto || !tipoLed || !tipo) {
        return (
            <Layout>
                <div className="flex min-h-screen items-center justify-center">
                    <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
                        <h2 className="text-xl font-semibold text-red-600">Datos incompletos</h2>
                        <button className="mt-4 rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700" onClick={() => navigate('/')}>
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
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

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
        }
    };

    return (
        <>
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

                <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
                    <div className="w-full max-w-md transform rounded-lg bg-white p-8 text-center shadow-xl transition-all hover:shadow-2xl">
                        <h2 className="mb-4 text-3xl font-bold text-blue-800">Resultado del Cálculo</h2>
                        <p className="mb-2 text-gray-700">
                            <strong>Dimensiones:</strong> {largoM} mm x {altoM} mm
                        </p>
                        <p className="mb-2 text-gray-700">
                            <strong>Área:</strong> {areaM2.toFixed(2)} m²
                        </p>
                        <p className="mb-2 text-gray-700">
                            <strong>Tipo de instalación:</strong> {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                        </p>
                        <p className="mb-4 text-gray-700">
                            <strong>Tipo de LED:</strong> {tipoLed.toUpperCase()}
                        </p>
                        <hr className="my-4 border-t border-gray-300" />
                        <p className="text-2xl font-semibold text-green-600">Precio estimado: ${precioFinal.toFixed(2)} USD</p>

                        <div className="mt-6 flex justify-center gap-4">
                            <button
                                className="flex cursor-pointer items-center gap-2 rounded-full bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                                onClick={() => setShowModal(true)}
                            >
                                <FontAwesomeIcon icon={faPaperPlane} /> Solicitar presupuesto
                            </button>
                            <button
                                className="cursor-pointer rounded-full bg-gray-200 px-6 py-2 text-gray-800 transition hover:bg-gray-300"
                                onClick={() => navigate('/')}
                            >
                                Calcular otro
                            </button>
                        </div>
                    </div>

                    {/* Modal */}
                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-6 backdrop-blur-sm">
                            <div className="animate-fadeIn relative w-full max-w-3xl scale-95 overflow-hidden rounded-2xl bg-white shadow-2xl transition-transform duration-300 ease-out">
                                {/* Botón de cierre */}
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="absolute top-4 right-4 text-gray-600 transition hover:text-red-600"
                                    aria-label="Cerrar modal"
                                >
                                    <FontAwesomeIcon icon={faTimes} size="lg" />
                                </button>

                                {/* Encabezado */}
                                <div className="bg-blue-600 p-5 text-center text-white">
                                    <h3 className="text-2xl font-semibold">Completa tus datos</h3>
                                    <p className="text-sm opacity-90">Te enviaremos una cotización personalizada</p>
                                </div>

                                {/* Contenido */}
                                <div className="max-h-[80vh] overflow-y-auto p-6">
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {/* Tipo de documento */}
                                            <div className="md:col-span-2">
                                                <label className="mb-1 block text-sm font-medium text-gray-700">Tipo de documento*</label>
                                                <div className="flex gap-6">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="tipo_documento"
                                                            value="DNI"
                                                            checked={formData.tipo_documento === 'DNI'}
                                                            onChange={handleInputChange}
                                                            required
                                                            className="form-radio text-blue-600"
                                                        />
                                                        <span className="ml-2">DNI</span>
                                                    </label>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="tipo_documento"
                                                            value="RUC"
                                                            checked={formData.tipo_documento === 'RUC'}
                                                            onChange={handleInputChange}
                                                            required
                                                            className="form-radio text-blue-600"
                                                        />
                                                        <span className="ml-2">RUC</span>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Nombre (solo si es DNI) */}
                                            {formData.tipo_documento === 'DNI' && (
                                                <div>
                                                    <label className="mb-1 block text-sm font-medium text-gray-700">Persona de contacto*</label>
                                                    <input
                                                        type="text"
                                                        name="nombre"
                                                        value={formData.nombre}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                            )}

                                            {/* Empresa (solo si es RUC) */}
                                            {formData.tipo_documento === 'RUC' && (
                                                <div>
                                                    <label className="mb-1 block text-sm font-medium text-gray-700">Empresa*</label>
                                                    <input
                                                        type="text"
                                                        name="empresa"
                                                        value={formData.empresa}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                            )}

                                            {/* Número de documento */}
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">Número de documento*</label>
                                                <input
                                                    type="text"
                                                    name="numero_documento"
                                                    value={formData.numero_documento}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                />
                                            </div>

                                            {/* Teléfono */}
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">Teléfono</label>
                                                <input
                                                    type="tel"
                                                    name="telefono"
                                                    value={formData.telefono}
                                                    onChange={handleInputChange}
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">Email*</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                />
                                            </div>

                                            {/* Comentario */}
                                            <div className="md:col-span-2">
                                                <label className="mb-1 block text-sm font-medium text-gray-700">Comentario</label>
                                                <textarea
                                                    name="comentario"
                                                    value={formData.comentario}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    placeholder="Detalles adicionales sobre tu proyecto..."
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                />
                                            </div>
                                        </div>

                                        <p className="mt-3 text-xs text-gray-500">
                                            Estos datos solo se usan para generar un presupuesto. No realizamos spam ni llamadas comerciales.
                                        </p>

                                        <div className="mt-6 flex justify-end gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                                                disabled={loading}
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm text-white transition ${
                                                    loading ? 'cursor-not-allowed bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
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
                                                        Enviar
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default Resultado;
