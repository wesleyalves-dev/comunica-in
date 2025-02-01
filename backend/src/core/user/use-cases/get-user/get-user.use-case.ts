import type { UseCase } from '../../../../shared/use-case'
import { database } from '../../../../infra/database'
import { User, UserOutput } from '../../entity/user.entity'

interface GetUserUseCaseInput {
  id: string
}

interface GetUserUseCaseOutput {
  data?: UserOutput
}

export class GetUserUseCase
  implements UseCase<GetUserUseCaseInput, GetUserUseCaseOutput>
{
  async execute(input: GetUserUseCaseInput): Promise<GetUserUseCaseOutput> {
    const user = await database.manager.findOne(User, {
      where: { id: input.id }
    })
    return {
      data: user?.toOutput()
    }
  }
}
