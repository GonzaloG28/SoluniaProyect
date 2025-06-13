import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/miapp");

app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));