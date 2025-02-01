import type { Request, Response } from 'express'

import {
  ListUsersUseCase,
  GetUserUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase
} from '../../../../core/user/use-cases'
import { statusCodeByContent } from '../../../../shared/utils/http'

export class UserController {
  private readonly listUsersUseCase = new ListUsersUseCase()
  private readonly getUserUseCase = new GetUserUseCase()
  private readonly createUserUseCase = new CreateUserUseCase()
  private readonly updateUserUseCase = new UpdateUserUseCase()
  private readonly deleteUserUseCase = new DeleteUserUseCase()

  async list(request: Request, response: Response): Promise<void> {
    const queryPage = Number(request.query.page)
    const page = Number.isInteger(queryPage) ? Number(queryPage) : undefined
    const output = await this.listUsersUseCase.execute({ page })
    response.json(output)
  }

  async get(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    const { data: user } = await this.getUserUseCase.execute({ id })
    const status = statusCodeByContent(user)
    response.status(status).json(user)
  }

  async create(request: Request, response: Response): Promise<void> {
    const { name, username, password } = request.body
    const { data: user } = await this.createUserUseCase.execute({
      data: {
        name,
        username,
        password
      }
    })
    response.status(201).json(user)
  }

  async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    const { name, username, password } = request.body
    const { data: user } = await this.updateUserUseCase.execute({
      id,
      data: {
        name,
        username,
        password
      }
    })
    const status = statusCodeByContent(user)
    response.status(status).json(user)
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    await this.deleteUserUseCase.execute({ id })
    response.status(204).end()
  }
}
