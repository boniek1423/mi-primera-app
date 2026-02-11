import { useState } from 'react';
import './Contacto.css';

export default function Contacto() {
  // Estados para los campos y errores
  const [datos, setDatos] = useState({ nombre: '', email: '', mensaje: '' });
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(false);

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const validarEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email); // Regex simple para validar email
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    if (!datos.nombre || !datos.email || !datos.mensaje) {
      setError('Por favor, rellena todos los campos.');
      return;
    }
    if (!validarEmail(datos.email)) {
      setError('El formato del correo no es válido.');
      return;
    }

    setError('');
    setEnviado(true);
    console.log("Datos enviados:", datos);
  };

  if (enviado) {
    return (
      <div className="success-container">
        <h2>¡Gracias, {datos.nombre}! ✨</h2>
        <p>Hemos recibido tu mensaje y te contactaremos pronto.</p>
        <button onClick={() => setEnviado(false)}>Enviar otro mensaje</button>
      </div>
    );
  }

  return (
    <div className="contacto-container">
      <h1>Contáctanos</h1>
      <form onSubmit={enviarFormulario} className="form-contacto">
        {error && <p className="error-msg">{error}</p>}
        
        <input 
          type="text" name="nombre" placeholder="Tu nombre" 
          onChange={manejarCambio} value={datos.nombre} 
        />
        
        <input 
          type="email" name="email" placeholder="Correo electrónico" 
          onChange={manejarCambio} value={datos.email} 
        />
        
        <textarea 
          name="mensaje" placeholder="Escribe tu mensaje aquí..." 
          onChange={manejarCambio} value={datos.mensaje}
        ></textarea>

        <button type="submit">Enviar Mensaje</button>
      </form>
    </div>
  );
}