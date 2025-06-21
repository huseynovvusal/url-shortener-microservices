declare global {
  namespace Express {
    interface Request {
      currentUser?: IAuthPayload
    }
  }
}

export interface IAuthPayload {
  id: string
  email: string
  username: string
}
