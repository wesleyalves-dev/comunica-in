import type { UseCase } from '../../../../shared/use-case'
import { database } from '../../../../infra/database'
import { User, UserOutput } from '../../entity/user.entity'

interface ListUsersUseCaseInput {
  page?: number
}

interface ListUsersUseCaseOutput {
  items: UserOutput[]
  total: number
}

export class ListUsersUseCase
  implements UseCase<ListUsersUseCaseInput, ListUsersUseCaseOutput>
{
  async execute(input: ListUsersUseCaseInput): Promise<ListUsersUseCaseOutput> {
    const { page = 1 } = input
    const take = 10
    const skip = (page - 1) * take
    const users = await database.manager.find(User, {
      take,
      skip,
      order: { username: 1 }
    })
    const total = await database.manager.count(User)
    return {
      items: users.map(user => user.toOutput()),
      total
    }
  }
}
