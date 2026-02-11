const enviarFormulario = async (e) => { // Agregamos async
    e.preventDefault();
    
    // Tus validaciones existentes
    if (!datos.nombre || !datos.email || !datos.mensaje) {
      setError('Por favor, rellena todos los campos.');
      return;
    }
    if (!validarEmail(datos.email)) {
      setError('El formato del correo no es válido.');
      return;
    }

    // --- NUEVO: Envío de datos al servicio ---
    try {
      const response = await fetch("https://formspree.io/f/mlgwgzrk", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setError('');
        setEnviado(true);
      } else {
        setError('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión. Revisa tu internet.');
    }
  };