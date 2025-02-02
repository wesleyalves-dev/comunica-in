import { Exception } from '../../../../shared/exception'

export class WrongCredentials extends Exception {
  constructor() {
    super('Usuário ou senha incorretos', 401)
  }
}

export const SignInException = {
  WrongCredentials
}
