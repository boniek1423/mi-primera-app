function Saludo({ nombre }) {
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px', margin: '10px' }}>
      <h2>¡Hola, <span style={{ color: 'blue' }}>{nombre}</span>! 👋</h2>
    </div>
  )
}

export default Saludo