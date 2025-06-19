import env from "@user-service/config/env"

const jwtConfig = {
  secret: env.JWT_SECRET,
  expiresIn: env.JWT_EXPIRES_IN,
}

export type JwtConfig = typeof jwtConfig

export default jwtConfig
