import type { UseCase } from '../../../../shared/use-case'
import { database } from '../../../../infra/database'
import { User } from '../../entity/user.entity'

interface DeleteUserUseCaseInput {
  id: string
}

type DeleteUserUseCaseOutput = void

export class DeleteUserUseCase
  implements UseCase<DeleteUserUseCaseInput, DeleteUserUseCaseOutput>
{
  async execute(
    input: DeleteUserUseCaseInput
  ): Promise<DeleteUserUseCaseOutput> {
    const { id } = input
    await database.manager.delete(User, { id })
  }
}
