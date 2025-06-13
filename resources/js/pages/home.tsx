import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FiAlertCircle, FiCheckCircle, FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/layout';

// Hook para detectar modo móvil
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    return isMobile;
};

const installationTypes = [
    { id: 1, name: 'Interior', value: 'interior' },
    { id: 2, name: 'Exterior', value: 'exterior' },
];

const ledTypes = [
    { id: 1, name: 'LED de 3mm (Alta densidad)', value: '3p' },
    { id: 2, name: 'LED de 5mm (Media densidad)', value: '5p' },
    { id: 3, name: 'LED de 8mm (Baja densidad)', value: '8p' },
];

const Home: React.FC = () => {
    const [largo, setLargo] = useState<string>('');
    const [alto, setAlto] = useState<string>('');
    const [selectedInstallation, setSelectedInstallation] = useState(installationTypes[0]);
    const [selectedLed, setSelectedLed] = useState(ledTypes[0]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const handleCalcular = async () => {
        if (!largo || !alto) {
            toast.error('Por favor complete todos los campos', {
                icon: <FiAlertCircle className="text-red-500" />,
                style: {
                    background: '#fff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
            });
            return;
        }

        const numLargo = parseFloat(largo);
        const numAlto = parseFloat(alto);

        if (numLargo <= 0 || numAlto <= 0) {
            toast.error('Las dimensiones deben ser mayores a cero', {
                icon: <FiAlertCircle className="text-red-500" />,
                style: {
                    background: '#fff',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                },
            });
            return;
        }

        setIsLoading(true);

        // Simulación de carga asíncrona
        await new Promise((resolve) => setTimeout(resolve, 1500));

        navigate('/precio', {
            state: {
                largo: numLargo,
                alto: numAlto,
                tipoLed: selectedLed.value,
                tipo: selectedInstallation.value,
            },
        });

        setIsLoading(false);
    };

    return (
        <Layout>
            <Toaster position="top-right" />
            <section className="min-h-screen w-full">
                <div className="container mx-auto px-4 py-10 md:py-24">
                    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center gap-12 pt-16`}>
                        {/* Calculadora */}
                        <div className={`${isMobile ? 'order-2 w-full' : 'order-1 w-1/2'}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mx-auto w-full max-w-md rounded-2xl border border-gray-100 bg-[rgba(235,235,238,0.1)] p-8 shadow-xl"
                            >
                                <div className="mb-6 text-center">
                                    <h2 className="mb-1 text-2xl font-bold text-blue-500">Calculadora LED</h2>
                                    <p className="text-md font-sans font-thin text-white">Presupuesto instantáneo en segundos</p>
                                </div>

                                <div className="space-y-5">
                                    <div className="gap-2 lg:flex">
                                        <div>
                                            <label className="mb-2 block font-serif text-sm font-medium text-gray-100">Largo (metros)</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    className="w-full rounded-lg border-b-2 border-gray-200 bg-[rgba(149,190,231,0.3)] px-4 py-3 text-white shadow-sm transition-all outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
                                                    value={largo}
                                                    onChange={(e) => setLargo(e.target.value)}
                                                    placeholder="Ej: 2.5"
                                                    step="0.01"
                                                    min="0"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mb-2 block font-serif text-sm font-medium text-gray-100">Alto (metros)</label>
                                            <input
                                                type="number"
                                                className="w-full rounded-lg border-b-2 border-gray-200 bg-[rgba(149,190,231,0.3)] px-4 py-3 text-white shadow-sm transition-all outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300"
                                                value={alto}
                                                onChange={(e) => setAlto(e.target.value)}
                                                placeholder="Ej: 1.8"
                                                step="0.01"
                                                min="0"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="w-full">
                                            <label className="mb-2 block font-serif text-sm font-medium text-gray-100">Tipo de instalación</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {installationTypes.map((type) => (
                                                    <div key={type.id}>
                                                        <input
                                                            type="radio"
                                                            id={`installation-${type.id}`}
                                                            name="installationType"
                                                            value={type.value}
                                                            checked={selectedInstallation.id === type.id}
                                                            onChange={() => setSelectedInstallation(type)}
                                                            className="hidden"
                                                        />
                                                        <label
                                                            htmlFor={`installation-${type.id}`}
                                                            className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 transition-all ${
                                                                selectedInstallation.id === type.id
                                                                    ? 'border-blue-500 bg-blue-500 text-white shadow-md'
                                                                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                                                            }`}
                                                        >
                                                            <span className="text-sm font-medium">{type.name}</span>
                                                            {selectedInstallation.id === type.id && (
                                                                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M5 13l4 4L19 7"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mt-3 mb-2 block font-serif text-sm font-medium text-gray-100">Tipo de LED</label>
                                            <select
                                                value={selectedLed.id}
                                                onChange={(e) => {
                                                    const selected = ledTypes.find((led) => led.id === parseInt(e.target.value));
                                                    setSelectedLed(selected);
                                                }}
                                                className="block w-full rounded-lg border border-gray-200 bg-white py-3 pr-10 pl-4 text-sm shadow-sm transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                            >
                                                {ledTypes.map((led) => (
                                                    <option key={led.id} value={led.id}>
                                                        {led.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            onClick={handleCalcular}
                                            disabled={isLoading}
                                            className={`flex w-full transform items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:from-blue-600 hover:to-blue-700 hover:shadow-lg active:scale-[0.98] ${isLoading ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'} `}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <FiLoader className="mr-2 animate-spin" />
                                                    Calculando...
                                                </>
                                            ) : (
                                                <>
                                                    <FiCheckCircle className="mr-2 transition-transform duration-300 group-hover:scale-110" />
                                                    Calcular Precio
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
                                    <h3 className="mb-1 flex items-center text-sm font-medium text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        ¿Necesitas ayuda?
                                    </h3>
                                    <p className="text-xs text-blue-600">Nuestros expertos pueden asesorarte para elegir la mejor opción.</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Texto descriptivo */}
                        <div className={`${isMobile ? 'order-1 mb-8 w-full' : 'order-2 w-1/2'} space-y-6 text-center lg:text-left`}>
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-4xl leading-tight font-bold text-gray-900 md:text-5xl"
                            >
                                PANTALLAS LED <span className="text-blue-600">PREMIUM</span>
                            </motion.h1>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                                <p className="text-xl font-medium text-blue-600 md:text-2xl">SOLUCIONES A MEDIDA PARA TU PROYECTO</p>
                                <p className="mt-2 text-xl font-bold text-blue-800 md:text-2xl">CALIDAD GARANTIZADA</p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="pt-4">
                                <ul className="space-y-3 text-lg text-gray-400">
                                    {['Calidad premium garantizada', 'Instalación profesional', 'Soporte técnico permanente'].map((item, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                                            className="flex items-center"
                                        >
                                            <span className="mr-3 rounded-full bg-blue-500 p-1 text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Home;
