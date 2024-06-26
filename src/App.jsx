import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import DetalleProducto from './pages/detalleProducto';
import Carrito from './pages/carrito'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalle" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </Router>
  );
}
export default App
