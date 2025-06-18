import React from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function obtenerRespuestaIA({ message, style }) {
  const res = await fetch(`${BASE_URL}/api/openai/respuesta`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, style }),
  });

  if (!res.ok) {
    throw new Error("Error al contactar con el servidor");
  }

  const data = await res.json();
  return data.result;
}