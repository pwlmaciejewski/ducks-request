export interface Request<R = any, E = Error> {
  pending: boolean
  success: boolean
  result?: R
  error?: E
}

export const defaultRequest: Request<any, any> = {
  pending: false,
  success: false
}
