import axios from 'axios'

import { Exception } from '../../shared/exception'
import type { ListResponse, Person, PersonOutput } from './interfaces'
import { PersonMapper } from './person.mapper'
import { MESSAGES_BY_STATUS } from './constants'

interface ListAllPeopleParams {
  page?: number
}

const TWO_SECONDS = 1000 * 2

export class Swapi {
  private readonly http = axios.create({
    baseURL: 'https://swapi.dev/api',
    timeout: TWO_SECONDS,
    timeoutErrorMessage: 'Serviço externo não respondeu'
  })
  private readonly personMapper = new PersonMapper()

  private async errorHandler<Output>(
    fn: () => Promise<Output>
  ): Promise<Output> {
    try {
      return await fn()
    } catch (error: any) {
      if (error.response?.status) {
        const message =
          MESSAGES_BY_STATUS.get(String(error.response?.status)) ??
          'Não foi possível concluir a consulta'
        throw new Exception(message, error.response.status, error.response.data)
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
