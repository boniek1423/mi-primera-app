import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'; // 1. Importamos useState
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';

function App() {
  // 2. Definimos el estado del contador
  const [carritoCount, setCarritoCount] = useState(0);

  // 3. Función para incrementar el carrito
  const agregarAlCarrito = () => {
    setCarritoCount(carritoCount + 1);
  };

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* 4. Pasamos la cuenta al Navbar */}
        <Navbar cuenta={carritoCount} />
        
        <main style={{ flex: 1, marginTop: '80px' }}>
          <Routes>
            {/* 5. Pasamos la función a las páginas que tengan botones de compra */}
            <Route path="/" element={<Inicio alClickComprar={agregarAlCarrito} />} />
            <Route path="/productos" element={<Productos alClickComprar={agregarAlCarrito} />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;