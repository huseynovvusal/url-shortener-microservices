import express from "express"
import { logger } from "@huseynovvusal/url-shortener-shared"
import appConfig from "@config/app.config"

const PORT = appConfig.port

const app = express()

app.get("/", (_req, res) => {
  res.send("Hello from User Service!")
})

app.listen(PORT, () => {
  logger.info(`User Service is running on PORT:${PORT}`)
})
