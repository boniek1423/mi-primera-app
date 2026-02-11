const enviarFormulario = async (e) => {
    e.preventDefault();
    
    // 1. Validaciones básicas
    if (!datos.nombre || !datos.email || !datos.mensaje) {
      setError('Por favor, rellena todos los campos.');
      return;
    }
    if (!validarEmail(datos.email)) {
      setError('El formato del correo no es válido.');
      return;
    }

    setError(''); // Limpiamos errores

    try {
      // 2. Envío real a TU ID de Formspree
      const response = await fetch("https://formspree.io/f/mlgwgzrk", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      if (response.ok) {
        setEnviado(true);
        console.log("¡Mensaje enviado con éxito a mlgwgzrk!");
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Hubo un error en el servidor de Formspree.');
      }
    } catch (err) {
      setError('Error de conexión. Revisa tu internet.');
      console.error("Error al conectar:", err);
    }
  };