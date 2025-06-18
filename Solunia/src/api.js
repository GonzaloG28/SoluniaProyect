import React from "react";

export async function obtenerRespuestaIA({ message, style }) {
  const res = await fetch("http://localhost:5000/api/openai/respuesta", {
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