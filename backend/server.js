import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import MongoDB from "mongodb"
import slotsrouter from "./api/slots.routes.js"
import slotsDAO from "./dao/slotsDAO.js"

dotenv.config()

const PORT = process.env.PORT || 3004
const app = express()

app.use(cors()) // Cors means Cross-Origin Resource Sharing. It is a security feature implemented in web browsers to allow web pages from different origins to request restricted resources
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // it parses incoming requests with urlencoded payloads

app.use("/", slotsrouter)
app.use("*", (req, res) => res.json({ error: "not found" }))

const MongoClient = MongoDB.MongoClient
MongoClient.connect(process.env.DATABASE_URI)
  .then(async client => {
    await slotsDAO.injectDB(client)
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`)
    })
  })
  .catch(error => console.error(error))
