import React from 'react';
import { useLocation } from 'react-router-dom';

const Precio: React.FC = () => {
  const location = useLocation();
  const { largo, alto, tipoLed, tipo } = location.state || {};

  if (!largo || !alto || !tipoLed || !tipo) {
    return <p className="p-4">Faltan datos para calcular el precio.</p>;
  }

  // Convertir de milímetros a metros
  const largoMetros = largo / 1000;
  const altoMetros = alto / 1000;
  const area = largoMetros * altoMetros;

  // Precios estimados por m² en USD (ejemplo)
  const precios = {
    interior: {
      '3p': 400,
      '5p': 300,
      '8p': 250
    },
    exterior: {
      '3p': 500,
      '5p': 400,
      '8p': 350
    }
  };

  const precioUnitario = precios[tipo][tipoLed];
  const precioTotal = area * precioUnitario;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Resultado del Cálculo</h1>
        <p><strong>Dimensiones:</strong> {largo} mm x {alto} mm</p>
        <p><strong>Área:</strong> {area.toFixed(2)} m²</p>
        <p><strong>Ubicación:</strong> {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</p>
        <p><strong>Tipo de LED:</strong> {tipoLed.toUpperCase()}</p>
        <hr className="my-4" />
        <p className="text-xl font-semibold text-green-600">
          Precio estimado: ${precioTotal.toFixed(2)} USD
        </p>
      </div>
    </div>
  );
};

export default Precio;
