import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

type TabKey = 'fisicas' | 'termicas' | 'display' | 'funcionales';

interface Imagen {
  id_imagen: number;
  url: string;
}

interface Descripcion {
  detalle?: string;
  modelo?: string;
  largo_mm?: number;
  alto_mm?: number;
  proteccion_ambiental?: string;
  tipo_led?: string;
  montaje?: string;
  instalacion?: string;
  resistencia_temperatura_min?: number;
  resistencia_temperatura_max?: number;
  procesador_imagen?: string;
  contraste?: number;
  tasa_refresco?: number;
  luminosidad_brillo?: string;
  propiedades_led?: string;
  comportamiento_humedad_min?: number;
  comportamiento_humedad_max?: number;
  angulo_vision_horizontal?: number;
  angulo_vision_vertical?: number;
  marca_blanca?: boolean;
  calibracion_cromatica?: string;
  reproductor_video?: string;
  configuracion?: string;
}

interface Producto {
  id_producto: number;
  nombre: string;
  tipo: string;
  precio_fijo: number;
  precio_oferta?: number;
  descripcion?: Descripcion;
  imagenes?: Imagen[];
}

const ProductoDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('fisicas');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    axios.get(`/api/productos/${id}`)
      .then(res => {
        setProducto(res.data);
        if (res.data.imagenes && res.data.imagenes.length > 0) {
          setMainImage(`http://localhost:8000/${res.data.imagenes[0].url}`);
        }
      })
      .catch(err => {
        console.error(err);
        navigate('/productos');
      });
  }, [id, navigate]);

  if (!producto) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-12 w-12 border-t-2 border-b-2 border-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const descripcion = producto.descripcion || {};
  const MAX_CHARS = 150;

  const tabs: Record<TabKey, { label: string; value: string | number | undefined }[]> = {
    fisicas: [
      { label: "Modelo", value: descripcion.modelo },
      { label: "Largo", value: `${descripcion.largo_mm} mm` },
      { label: "Alto", value: `${descripcion.alto_mm} mm` },
      { label: "Protección ambiental", value: descripcion.proteccion_ambiental },
    ],
    termicas: [
      { label: "Temp. mínima", value: `${descripcion.resistencia_temperatura_min}°C` },
      { label: "Temp. máxima", value: `${descripcion.resistencia_temperatura_max}°C` },
      { label: "Humedad mín.", value: `${descripcion.comportamiento_humedad_min}%` },
      { label: "Humedad máx.", value: `${descripcion.comportamiento_humedad_max}%` },
    ],
    display: [
      { label: "Tipo LED", value: descripcion.tipo_led },
      { label: "Brillo", value: descripcion.luminosidad_brillo },
      { label: "Contraste", value: descripcion.contraste },
      { label: "Tasa de refresco", value: `${descripcion.tasa_refresco} Hz` },
      { label: "Ángulo horizontal", value: `${descripcion.angulo_vision_horizontal}°` },
      { label: "Ángulo vertical", value: `${descripcion.angulo_vision_vertical}°` },
    ],
    funcionales: [
      { label: "Marca blanca", value: descripcion.marca_blanca ? "Sí" : "No" },
      { label: "Calibración cromática", value: descripcion.calibracion_cromatica },
      { label: "Reproductor de video", value: descripcion.reproductor_video },
      { label: "Configuración", value: descripcion.configuracion },
    ],
  };

  const truncateText = (text: string) =>
    showFullDescription ? text : text.slice(0, MAX_CHARS) + (text.length > MAX_CHARS ? '...' : '');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb y volver */}
      <nav className="text-sm text-gray-500 mb-2">
        <span className="cursor-pointer hover:text-indigo-600" onClick={() => navigate('/productos')}>Productos</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{producto.nombre}</span>
      </nav>
      <button onClick={() => navigate(-1)} className="mb-4 text-indigo-600 hover:underline">← Volver</button>

      {/* Contenedor principal */}
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6">
          {/* Galería de imágenes */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Imágenes</h2>
            <div className="border rounded bg-gray-50 p-4 mb-2">
              <img src={mainImage} alt="Imagen principal" className="w-full h-64 sm:h-80 object-contain" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {producto.imagenes?.map((img) => (
                <img
                  key={img.id_imagen}
                  src={`http://localhost:8000/${img.url}`}
                  alt="Miniatura"
                  onClick={() => setMainImage(`http://localhost:8000/${img.url}`)}
                  className={`cursor-pointer w-full h-16 object-cover border rounded ${mainImage.includes(img.url) ? 'border-indigo-600' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Info del producto */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-3">{producto.nombre}</h1>
            <p className="text-gray-700"><strong>Tipo:</strong> {producto.tipo}</p>
            <p className="text-gray-700"><strong>Precio fijo:</strong> S/ {Number(producto.precio_fijo).toFixed(2)}</p>
            {producto.precio_oferta && (
              <p className="text-green-600"><strong>Oferta:</strong> S/ {Number(producto.precio_oferta).toFixed(2)}</p>
            )}
            {descripcion.detalle && (
              <div className="mt-4 text-gray-700 italic">
                {truncateText(descripcion.detalle)}
                {descripcion.detalle.length > MAX_CHARS && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="ml-1 text-indigo-600 hover:underline"
                  >
                    {showFullDescription ? 'Ver menos' : 'Ver más'}
                  </button>
                )}
              </div>
            )}

            {/* Acciones */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">Editar</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Eliminar</button>
              <button
                onClick={async () => {
                  try {
                    const response = await axios.get(`http://localhost:8000/api/productos/${id}/exportar-pdf`, {
                      responseType: 'blob',
                    });

                    const blob = new Blob([response.data], { type: 'application/pdf' });
                    const url = window.URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `producto_${id}.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                  } catch (error) {
                    console.error("Error al descargar el PDF:", error);
                  }
                }}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Exportar PDF
              </button>
            </div>
          </div>
        </div>

        {/* Tabs de especificaciones */}
        <div className="border-t mt-6 px-6 pt-6">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">Especificaciones Técnicas</h2>

          <div className="flex flex-wrap sm:flex-nowrap space-x-2 mb-4 overflow-x-auto">
            {(['fisicas', 'termicas', 'display', 'funcionales'] as TabKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium whitespace-nowrap rounded-t-md ${
                  activeTab === tab
                    ? 'bg-indigo-100 text-indigo-700 border-b-2 border-indigo-600'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {{
                  fisicas: 'Físicas 📏',
                  termicas: 'Térmicas 🌡️',
                  display: 'Display 💻',
                  funcionales: 'Funcionales ⚙️'
                }[tab]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-5 gap-4 text-sm text-gray-800">
            {tabs[activeTab]
              .filter(spec => spec.value !== undefined && spec.value !== '')
              .map((spec, idx) => (
                <p key={idx}><strong>{spec.label}:</strong> {spec.value}</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
