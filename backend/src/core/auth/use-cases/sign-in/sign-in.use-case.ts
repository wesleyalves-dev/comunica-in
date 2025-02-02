import jwt from 'jsonwebtoken'

import type { UseCase } from '../../../../shared/use-case'
import { database } from '../../../../infra/database'
import { config } from '../../../../config'
import { User } from '../../../user/entity/user.entity'
import { SignInException } from './sign-in.exception'

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

    if (!user) throw new SignInException.WrongCredentials()

    if (!user.verifyPassword(password))
      throw new SignInException.WrongCredentials()

    return {
      token: jwt.sign({}, config.token.secret, {
        subject: user.id,
        expiresIn: '1d'
      })
    }
  }
}
