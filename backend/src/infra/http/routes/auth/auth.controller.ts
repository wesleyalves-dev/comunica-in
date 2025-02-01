import type { Request, Response } from 'express'

import { SignInUseCase } from '../../../../core/auth/use-cases'
import { config } from '../../../../config'

export class AuthController {
  private readonly signInUseCase = new SignInUseCase()

  async signIn(request: Request, response: Response): Promise<void> {
    const { username, password } = request.body
    const { token } = await this.signInUseCase.execute({ username, password })
    response
      .cookie(config.token.cookie, token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: config.environment === 'production'
      })
      .status(200)
      .end()
  }
}
