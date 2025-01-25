import jwt from 'jsonwebtoken'

import { database } from '../../../infra/database'
import { Exception } from '../../../shared/exception'
import { config } from '../../../config'
import { User } from '../../user/entity/user.entity'

interface SignInInput {
  username: string
  password: string
}

interface SignInOutput {
  token: string
}

export class AuthService {
  async signIn(input: SignInInput): Promise<SignInOutput> {
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
