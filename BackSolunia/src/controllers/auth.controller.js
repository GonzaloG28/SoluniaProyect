import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import envs from "../config/envs.config.js"

const JWT_SECRET = envs.JWT_SECRET;

export const register = async (req, res) => {
  const { email, password } = req.body;

    try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "El usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("Contraseña incorrecta");
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    if (!process.env.JWT_SECRET && !envs.JWT_SECRET) {
      console.error("JWT_SECRET no está definido");
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("Token generado");

    res.json({ token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};