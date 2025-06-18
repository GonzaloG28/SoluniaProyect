import express from "express";
import { OpenAI } from "openai";
import envs from "../config/envs.config.js";

const router = express.Router();

const openai = new OpenAI({ apiKey: envs.OPENAI_API_KEY });

const estilos = {
  empatico: "Responde con comprensión, cercanía y empatía, que ayude a ver la situación con más calma. Máximo 150 palabras.",
  sabio: "Responde como un mentor sabio, con una perspectiva práctica o emocional para superar el problema. Máximo 150 palabras.",
  motivacional: "Responde de forma original e inspiradora y poderosa que motive a avanzar con otra mirada. Máximo 150 palabras.",
  racional: "Responde de forma lógica y objetiva, como si fueras un psicólogo cognitivo. Explica con claridad el origen posible del conflicto y ofrece una forma de afrontarlo. Máximo 150 palabras.",
  directo: "Responde de forma honesta y directa, sin rodeos, como un amigo que te dice la verdad aunque duela. Sé claro, firme y útil. Máximo 150 palabras.",
};

router.post("/respuesta", async (req, res) => {
  const { message, style } = req.body;

  if (!message || !style) {
    return res.status(400).json({ error: "Faltan datos necesarios" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: estilos[style] || estilos["empatico"] },
        { role: "user", content: message },
      ],
      max_tokens: 300,
      temperature: 0.9,
    });

    const content = response.choices[0]?.message?.content;
    res.json({ result: content });
  } catch (error) {
    console.error("Error con OpenAI:", error);
    res.status(500).json({ error: "Error al obtener respuesta de la IA" });
  }
});

export default router;