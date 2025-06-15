// app.tsx o routes.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Resultado from './pages/resultado';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/precio" element={<Resultado />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
