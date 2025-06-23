import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Resultado from './pages/resultado';
import Layout from "./layouts/layout-admin";
import Dashboard from "./pages/dashboard";
import Clientes from "./pages/clientes";
import { HelmetProvider } from 'react-helmet-async';
// Importa las páginas de tu panel de administrador
import DashboardAdmin from './pages/admin/dashboard';
import Users from './pages/admin/users';
import Pedidos from './pages/clientesconpedidos';
import Productos from './pages/listaproductos';
import ProductoDetalle from './pages/productodetalles'; // Ajusta según tu estructura

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/precio" element={<Resultado />} />
          <Route path="/admin" element={<Layout><Dashboard /></Layout>} />
          <Route path="/admin/clientes" element={<Layout><Clientes /></Layout>} />
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/pedidos" element={<Layout><Pedidos /></Layout>} />
          <Route path="/admin/productos" element={<Layout><Productos /></Layout>} />
          <Route path="/productos/:id" element={<Layout><ProductoDetalle /></Layout>} />

          {/* Puedes añadir una ruta de "No encontrado" si lo deseas */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
