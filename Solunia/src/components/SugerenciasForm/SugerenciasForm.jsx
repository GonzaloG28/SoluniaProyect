import { useEffect, useState } from "react";
import "./sugerenciasForm.css"

export default function SugerenciasForm() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const maxChars = 300;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 45000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.length < 5) {
      alert("Escribe una sugerencia más completa.");
      return;
    }

    const res = await fetch("https://formspree.io/f/xpwdvbyz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (res.ok) {
      setSubmitted(true);
      setMessage("");
    } else {
      alert("Hubo un problema al enviar la sugerencia.");
    }
  };

  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {!submitted ? (
          <>
            <h2>¿Cómo podemos mejorar esta página?, ¿Que añadirias o cambiarias?</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                placeholder="Tu sugerencia anónima..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={maxChars}
              />
              <div>
                <small>{message.length} / {maxChars} caracteres</small>
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn-submit">Enviar</button>
                <button type="button" className="btn-close" onClick={() => setVisible(false)}>Cerrar</button>
              </div>
            </form>

          {/* <div className="container-donated">
             <p>¿Quieres apoyar el proyecto? ¡Tu ayuda es muy valiosa!</p><a href="https://ko-fi.com/soluniaproyect" target="_blank">Donar</a>
           </div>*/}
          </>
        ) : (
          <>
            <h3>¡Gracias por ayudarnos a mejorar! 😊</h3>
            <button onClick={() => setVisible(false)} className="btn-close">Cerrar</button>
          </>
        )}
      </div>
    </div>
  );
}
