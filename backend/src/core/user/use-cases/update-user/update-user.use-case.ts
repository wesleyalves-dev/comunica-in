import type { UseCase } from '../../../../shared/use-case'
import { database } from '../../../../infra/database'
import { User, UserOutput } from '../../entity/user.entity'

interface UpdateUserUseCaseInput {
  id: string
  data: {
    name?: string
    username?: string
    password?: string
  }
}

interface UpdateUserUseCaseOutput {
  data?: UserOutput
}

export class UpdateUserUseCase
  implements UseCase<UpdateUserUseCaseInput, UpdateUserUseCaseOutput>
{
  async execute(
    input: UpdateUserUseCaseInput
  ): Promise<UpdateUserUseCaseOutput> {
    const { id, data } = input
    const update = database.manager.create(User, data)
    await database.manager.update(User, id, update)
    const user = await database.manager.findOne(User, { where: { id } })
    return {
      data: user?.toOutput()
    }
  }
}
