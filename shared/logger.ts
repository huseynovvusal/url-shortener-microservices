import winston from "winston"

const isProduction = process.env.NODE_ENV === "production"

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(
        ({ level, message, timestamp, ...meta }) =>
          `[${level}] ${timestamp} - ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta) : ""
          }`
      )
    ),
  }),
]

export const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
  format: winston.format.json(),
  transports: transports,
})
