import type { Request, Response, NextFunction } from 'express'

import { Exception } from '../../../shared/exception'

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction
): void {
  if (error instanceof Exception) {
    const { message, status = 500, details } = error
    response.status(status).json({ message, details })
  } else {
    const { message } = error
    response.status(500).json({ message })
  }
}
