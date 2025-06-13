import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true, 
});

export async function obtenerRespuestaIA({ message, style }){
    const estilos = {
        empatico: "Responde con comprensión, cercanía y empatía, que ayude a ver la situación con más calma, Máximo 150 palabras.",
        sabio: "Responde como un mentor sabio, con una perspectiva práctica o emocional para superar el problema, Máximo 150 palabras.",
        motivacional: "Responde de forma original e inspiradora y poderosa que motive a avanzar con otra mirada, Máximo 150 palabras.",
        racional: "Responde de forma lógica y objetiva, como si fueras un psicólogo cognitivo. Explica con claridad el origen posible del conflicto y ofrece una forma de afrontarlo. Máximo 150 palabras.",
        directo: "Responde de forma honesta y directa, sin rodeos, como un amigo que te dice la verdad aunque duela. Sé claro, firme y útil. Máximo 150 palabras.",
    };

    const prompt = `${estilos[style]}\nUsuario: ${message}`;

    const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: estilos[style] || estilos["empatico"] },
      { role: "user", content: message },
    ],
    max_tokens: 300,
    temperature: 0.9,
  });

  return response.choices[0].message.content;
}