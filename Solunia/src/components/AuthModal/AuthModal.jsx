  import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../authContext";
import "./AuthModal.css"; // Asegúrate de crear o ajustar este archivo de estilos

const AuthModal = ({ isOpen = false, onClose = () => {}, mode = "login" }) => {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const { login, register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setIsLogin(mode === "login"); // cada vez que cambia el modo desde afuera
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      onClose(); // Cierra el modal al terminar
    } catch (error) {
      console.error("Error en autenticación:", error);
      alert("Error al iniciar sesión o registrarse.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content-login">
        <h2>{isLogin ? "Iniciar sesión" : "Registrarse"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            type="email"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            type="password"
            required
          />
          <button type="submit">{isLogin ? "Ingresar" : "Registrarse"}</button>
        </form>

        <button
          className="toggle-button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
        <button className="close-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default AuthModal;