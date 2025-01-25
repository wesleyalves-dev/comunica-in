import { database } from '../../../infra/database'
import { User, type UserOutput } from '../entity/user.entity'

interface ListParams {
  page?: number
}

interface ListOutput {
  items: UserOutput[]
  total: number
}

interface UserCreateData {
  name: string
  username: string
  password: string
}

interface UserUpdateData {
  name?: string
  username?: string
  password?: string
}

export class UserService {
  async list(params: ListParams): Promise<ListOutput> {
    const { page = 1 } = params
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

  async get(id: string): Promise<UserOutput | undefined> {
    const user = await database.manager.findOne(User, { where: { id } })
    return user?.toOutput()
  }

  async create(data: UserCreateData): Promise<UserOutput> {
    const user = database.manager.create(User, data)
    await database.manager.save(User, user)
    return user.toOutput()
  }

  async update(
    id: string,
    data: UserUpdateData
  ): Promise<UserOutput | undefined> {
    const update = database.manager.create(User, data)
    await database.manager.update(User, id, update)
    const user = await database.manager.findOne(User, { where: { id } })
    return user?.toOutput()
  }

  async delete(id: string): Promise<void> {
    await database.manager.delete(User, { id })
  }
}
