import type { UseCase } from '../../../../shared/use-case'
import { database } from '../../../../infra/database'
import { User, UserOutput } from '../../entity/user.entity'

interface CreateUserUseCaseInput {
  data: {
    name: string
    username: string
    password: string
  }
}

interface CreateUserUseCaseOutput {
  data: UserOutput
}

export class CreateUserUseCase
  implements UseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput>
{
  async execute(
    input: CreateUserUseCaseInput
  ): Promise<CreateUserUseCaseOutput> {
    const { data } = input
    const user = database.manager.create(User, data)
    await database.manager.save(User, data)
    return {
      data: user.toOutput()
    }
  }
}
