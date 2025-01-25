import axios from 'axios'

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

  async listAllPeople(
    params?: ListAllPeopleParams
  ): Promise<ListResponse<PersonOutput>> {
    const { page } = params ?? {}
    const { data } = await this.http.get<ListResponse<Person>>('/people', {
      params: { page }
    })
    return {
      ...data,
      results: data.results.map(this.personMapper.toOutput)
    }
  }

  async getPerson(id: number): Promise<PersonOutput> {
    const { data } = await this.http.get<Person>(`/people/${id}`)
    return this.personMapper.toOutput(data)
  }
}
