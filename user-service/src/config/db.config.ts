import env from "@user-service/config/env"

const dbConfig = {
  url: env.DATABASE_URL,
}

export type DbConfig = typeof dbConfig

export default dbConfig
