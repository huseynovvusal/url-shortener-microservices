import express from "express"

const PORT = process.env.PORT || 3000

const app = express()

app.get("/", (_req, res) => {
  res.send("Hello from User Service!")
})

app.listen(PORT, () => {
  console.log(`User Service is running on http://localhost:${PORT}`)
})
