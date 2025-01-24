import { database } from '../../../infra/database'
import { User, type UserOutput } from '../entity/user.entity'

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
  async list(): Promise<UserOutput[]> {
    const users = await database.manager.find(User)
    return users.map(user => user.toOutput())
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
