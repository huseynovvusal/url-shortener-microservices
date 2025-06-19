import express from "express"
import { logger } from "@huseynovvusal/url-shortener-shared"

const PORT = process.env.PORT || 3000

const app = express()

app.get("/", (_req, res) => {
  res.send("Hello from User Service!")
})

app.listen(PORT, () => {
  logger.info(`User Service is running on PORT:${PORT}`)
})
