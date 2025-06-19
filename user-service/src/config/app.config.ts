import env from "@user-service/config/env"

const appConfig = {
  env: env.NODE_ENV,
  port: env.PORT,
}

export type AppConfig = typeof appConfig

export default appConfig
