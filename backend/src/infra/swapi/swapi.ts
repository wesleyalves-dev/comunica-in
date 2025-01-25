import axios from 'axios'

import { Exception } from '../../shared/exception'
import type { ListResponse, Person, PersonOutput } from './interfaces'
import { PersonMapper } from './person.mapper'

interface ListAllPeopleParams {
  page?: number
}

export class Swapi {
  private readonly http = axios.create({
    baseURL: 'https://swapi.dev/api'
  })
  private readonly personMapper = new PersonMapper()

  private async errorHandler<Output>(
    fn: () => Promise<Output>
  ): Promise<Output> {
    try {
      return await fn()
    } catch (error: any) {
      if (error.response.status === 404) {
        throw new Exception('Recurso não encontrado', 404, error.response.data)
      }
      throw error
    }
  }

  async listAllPeople(
    params?: ListAllPeopleParams
  ): Promise<ListResponse<PersonOutput>> {
    const { page } = params ?? {}
    const { data } = await this.errorHandler(async () => {
      return await this.http.get<ListResponse<Person>>('/people', {
        params: { page }
      })
    })
    return {
      ...data,
      results: data.results.map(this.personMapper.toOutput)
    }
  }

  async getPerson(id: number): Promise<PersonOutput> {
    const { data } = await this.errorHandler(async () => {
      return await this.http.get<Person>(`/people/${id}`)
    })
    return this.personMapper.toOutput(data)
  }
}
