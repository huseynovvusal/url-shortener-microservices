import { StatusCodes } from "http-status-codes"

export interface IError {
  message: string
  statusCode: number
}

export abstract class BaseError extends Error {
  abstract statusCode: number

  constructor(message: string) {
    super(message)
  }
}

export class NotFoundError extends BaseError {
  statusCode = StatusCodes.NOT_FOUND

  constructor(message: string) {
    super(message)
  }
}

export class BadRequestError extends BaseError {
  statusCode = StatusCodes.BAD_REQUEST

  constructor(message: string) {
    super(message)
  }
}

export class UnauthorizedError extends BaseError {
  statusCode = StatusCodes.UNAUTHORIZED

  constructor(message: string) {
    super(message)
  }
}
