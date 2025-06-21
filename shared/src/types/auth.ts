declare global {
  namespace Express {
    interface Request {
      user?: IAuthPayload
    }
  }
}

export interface IAuthPayload {
  id: string
  email: string
  username: string
}
