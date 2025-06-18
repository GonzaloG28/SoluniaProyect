import dotenv from "dotenv"

dotenv.config()

export default {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
}