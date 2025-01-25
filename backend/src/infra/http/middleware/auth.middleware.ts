import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { config } from '../../../config'

export function auth(request: Request, response: Response, next: NextFunction) {
  const token = request.cookies[config.token.cookie]?.replace('Bearer ', '')

  if (!token) {
    response.status(401).json({ message: 'É necessário fazer login' })
    return
  }

  try {
    jwt.verify(token, config.token.secret)
    next()
  } catch {
    response.status(401).json({ message: 'O token de acesso é inválido' })
  }
}
