import * as jwtDecode from "jwt-decode";
import { createContext, useState } from "react";

const AuthContext = createContext();
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userEmail, setUserEmail] = useState(null);

   const setSession = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    if (token) {
      const decoded = jwtDecode.jwtDecode(token);
      setUserEmail(decoded.email);
    } else {
      setUserEmail(null);
    }
  };

  const login = async (email, password) => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Error en login");
    }

    const data = await res.json();
    setSession(data.token);
  };

  const register = async (email, password) => {
    if (!email || !password) throw new Error("Todos los campos son obligatorios");

    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Error en registro");
    }

    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ token, userEmail, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };