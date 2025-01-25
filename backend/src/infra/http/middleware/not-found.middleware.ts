import { Request, Response } from 'express'

export function notFound(_: Request, response: Response): void {
  response.status(404).json({ message: 'Not Found' })
}
