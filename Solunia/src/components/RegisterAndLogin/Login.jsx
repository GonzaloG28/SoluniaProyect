import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext";
import "./login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      alert("error al hacer login");
      console.log(error.message)
    }
  };

  return (
    <div className="auth-page">
      <h2>Iniciar sesión</h2>
      <form className="form_registro" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="input_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="input_password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      <p>¿No tienes cuenta? <Link to="/register">Registrate aquí</Link></p>
    </div>
  );
};

export default Login;