import type { Request, Response } from 'express'

import { Swapi } from '../../../swapi'

export class SwapiController {
  private readonly swapi = new Swapi()

  async list(request: Request, response: Response): Promise<void> {
    const page = request.query.page ? Number(request.query.page) : undefined
    const people = await this.swapi.listAllPeople({ page })
    response.json(people)
  }

  async get(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    const person = await this.swapi.getPerson(Number(id))
    response.json(person)
  }
}
