import express from "express"
import envs from "./config/envs.config.js";
import cors from "cors";
import openaiRoute from "./routes/openai.js";

import { connectMongoDB } from "./config/mongoDB.config.js"


const app = express()

connectMongoDB()
 
app.use(express.json())
//sirve para que pueda leer todo tipo de escritura
app.use(express.urlencoded({extended: true}))

app.use(cors());


//rutas
app.use("/api/openai", openaiRoute)


app.listen(envs.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${envs.PORT}`)
})

