import { Link } from 'react-router-dom';
import './Navbar.css';

// 1. Recibimos 'cuenta' como prop
function Navbar({ cuenta }) {
  const enlaces = [
    { nombre: 'Inicio', ruta: '/' },
    { nombre: 'Productos', ruta: '/productos' },
    { nombre: 'Contacto', ruta: '/contacto' }
  ];

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          <h2>Mi Logo</h2>
        </Link>
      </div>
      
      <ul className="nav-links">
        {enlaces.map((enlace, index) => (
          <li key={index}>
            <Link to={enlace.ruta}>{enlace.nombre}</Link>
          </li>
        ))}

        {/* 2. Añadimos el icono del carrito al final de la lista */}
        <li className="cart-container">
          <span style={{ fontSize: '1.5rem' }}>🛒</span>
          {/* Solo mostramos la burbuja si hay algo en el carrito */}
          {cuenta > 0 && <span className="cart-badge">{cuenta}</span>}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;