import type { Request, Response } from 'express'

import { UserService } from '../../../../core/user/service/user.service'

export class UserController {
  private readonly userService = new UserService()

  async list(request: Request, response: Response): Promise<void> {
    const queryPage = Number(request.query.page)
    const page = Number.isInteger(queryPage) ? Number(queryPage) : undefined
    const users = await this.userService.list({ page })
    response.json(users)
  }

  async get(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    const user = await this.userService.get(id)
    response.json(user)
  }

  async create(request: Request, response: Response): Promise<void> {
    const { name, username, password } = request.body
    const user = await this.userService.create({ name, username, password })
    response.status(201).json(user)
  }

  async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    const { name, username, password } = request.body
    const user = await this.userService.update(id, { name, username, password })
    response.json(user)
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    await this.userService.delete(id)
    response.status(204).end()
  }
}
