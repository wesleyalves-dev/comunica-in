import type { Request, Response, NextFunction } from 'express'

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction
): void {
  response.status(500).json({ message: error.message })
}
