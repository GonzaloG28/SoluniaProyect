import express from "express"
import envs from "./config/envs.config.js"
import cors from "cors"

import { connectMongoDB } from "./config/mongoDB.config.js"


const app = express()

connectMongoDB()
 
app.use(express.json())
//sirve para que pueda leer todo tipo de escritura
app.use(express.urlencoded({extended: true}))

//rutas
//app.use("/api", productRouter) 
//app.use("/api", cartRouter)

app.listen(envs.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${envs.PORT}`)
})

