import type { Request, Response } from 'express'

import { UserService } from '../../../../core/user/service/user.service'
import { statusCodeByContent } from '../../../../shared/utils/http'

export class UserController {
  private readonly userService = new UserService()

  async list(request: Request, response: Response): Promise<void> {
    const queryPage = Number(request.query.page)
    const page = Number.isInteger(queryPage) ? Number(queryPage) : undefined
    const output = await this.userService.list({ page })
    response.json(output)
  }

  async get(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    const user = await this.userService.get(id)
    const status = statusCodeByContent(user)
    response.status(status).json(user)
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
    const status = statusCodeByContent(user)
    response.status(status).json(user)
  }

  async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    await this.userService.delete(id)
    response.status(204).end()
  }
}
