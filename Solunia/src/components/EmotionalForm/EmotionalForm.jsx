import { useState, useEffect } from "react";
import { obtenerRespuestaIA } from "../../api";
import IAResponse from "../IAResponse/IAResponse";
import AnimatedFace from "../AnimatedFace/AnimatedFace";
import "./emotionalForm.css"

const phrases = [
  "Cuéntame qué te sucede",
  "Respira profundo... ¿Qué te gustaría compartir hoy?",
  "Tu bienestar importa. ¿Cómo te sientes?",
  "Este es tu espacio seguro. ¿Qué te preocupa?",
  "Suelta lo que llevas dentro, sin juicio.",
  "¿Algo te está pesando? Desahógate conmigo.",
  "Todo empieza con una palabra. ¿Cuál sería la tuya hoy?",
  "Cuéntame qué pasa, juntos encontramos claridad."
];

// Nuevos estilos disponibles
const estilosDisponibles = [
  { key: "empatico", label: "Empático" },
  { key: "sabio", label: "Sabio" },
  { key: "motivacional", label: "Inspirador" },
  { key: "racional", label: "Racional" },
  { key: "directo", label: "Directo" },
];


export default function EmotionalForm({ setStyle }) {
    const [message, setMessage] = useState("");
  const [style, setLocalStyle] = useState("empatico");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");
  const [errorMessage, setErrorMessage] = useState("");
  const maxChars = 100;


    useEffect(() => {
        const savedStyle = localStorage.getItem("selectedStyle");
        if (savedStyle) {
            setLocalStyle(savedStyle);
            setStyle(savedStyle); // actualiza el padre si es necesario
        }
    }, [setStyle]);

  const handleStyleChange = (e) => {
    const selected = e.target.value;
    setLocalStyle(selected);
    setStyle(selected);
    localStorage.setItem("selectedStyle", selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setErrorMessage("Por favor, escribe algo antes de enviar.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (message.length > maxChars) {
      setErrorMessage(`Por favor, no superes los ${maxChars} caracteres.`);
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setErrorMessage(""); // Limpia cualquier error anterior
    setResponse("Procesando tu situación emocional...");
    setLoading(true);

    try {
      const iaResponse = await obtenerRespuestaIA({ message, style });
      setResponse(iaResponse);
    } catch (error) {
      console.log(error);
      setResponse("Hubo un error al contactar con la IA.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("fade-out");
      setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setFadeState("fade-in");
      }, 700);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

    return(

         <div style={{ margin: "auto", padding: 20 }} className="form-container">
      <h2 className={`form-title ${fadeState}`}>{phrases[currentPhraseIndex]}</h2>
      <AnimatedFace style={style} />

      <form className="form-body" onSubmit={handleSubmit}>
        <textarea
          className="form-textarea"
          placeholder="Escribe tu situación aquí..."
          rows="5"
          value={message}
          onChange={(e) => {
            if (e.target.value.length <= maxChars) {
              setMessage(e.target.value);
            }
          }}
          onFocus={(e) => (e.target.style.border = "4px solid #4f46e5")}
          onBlur={(e) => (e.target.style.border = "4px solid #ccc")}
          style={{
            width: "90%",
            padding: "12px",
            marginBottom: "16px",
            resize: "none",
            borderRadius: "12px",
            border: "4px solid #ccc",
            outline: "none",
            transition: "border 0.3s ease",
          }}
        />

        {errorMessage && <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>}

        <div style={{ marginBottom: 10 }}>
          <small>{message.length} / {maxChars} caracteres</small>
        </div>

        <div className="style-switch" style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "16px" }}>
          {estilosDisponibles.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`switch-btn ${key} ${style === key ? "active" : ""}`}
              onClick={() => handleStyleChange({ target: { value: key } })}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="submit-button-wrapper">
          <button className={`form-button submit-btn ${style}`} type="submit">
            Obtener respuesta
          </button>
        </div>
      </form>

      <IAResponse response={response} style={style} loading={loading} />
    </div>
  );
}