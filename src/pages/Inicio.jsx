// Asegúrate de recibir la prop aquí
function Inicio({ alClickComprar }) {
  return (
    <div>
      <h1>Nuestra Colección</h1>
      <div className="productos-grid">
        {/* En cada botón de tus productos, añade el onClick */}
        <button onClick={alClickComprar} className="btn-ver-mas">
          Ver más
        </button>
        
        {/* Repite lo mismo para los otros productos o usa un .map() */}
        <button onClick={alClickComprar} className="btn-ver-mas">
          Ver más
        </button>
      </div>
    </div>
  );
}