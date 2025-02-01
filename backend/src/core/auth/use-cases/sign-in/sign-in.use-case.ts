import jwt from 'jsonwebtoken'

import type { UseCase } from '../../../../shared/use-case'
import { database } from '../../../../infra/database'
import { Exception } from '../../../../shared/exception'
import { config } from '../../../../config'
import { User } from '../../../user/entity/user.entity'

interface SignInUseCaseInput {
  username: string
  password: string
}

interface SignInUseCaseOutput {
  token: string
}

export class SignInUseCase
  implements UseCase<SignInUseCaseInput, SignInUseCaseOutput>
{
  async execute(input: SignInUseCaseInput): Promise<SignInUseCaseOutput> {
    const { username, password } = input
    const user = await database.manager.findOne(User, { where: { username } })
    const wrongCredentials = new Exception('Usuário ou senha incorretos', 401)

    if (!user) throw wrongCredentials

    if (!user.verifyPassword(password)) throw wrongCredentials

    return {
      token: jwt.sign({}, config.token.secret, {
        subject: user.id,
        expiresIn: '1d'
      })
    }
  }
}
