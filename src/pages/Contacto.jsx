const enviarFormulario = async (e) => {
  e.preventDefault();
  
  // 1. Sustituye 'TU_ID_AQUI' por tu código de Formspree (ej. mwkgpoye)
  const FORM_ID = "TU_ID_AQUI"; 

  try {
    const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(datos)
    });

    if (response.ok) {
      setEnviado(true);
      setError("");
    } else {
      const data = await response.json();
      setError(data.error || "Hubo un problema. Revisa el ID de Formspree.");
    }
  } catch (err) {
    setError("Error de conexión. Inténtalo más tarde.");
  }
};