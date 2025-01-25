import request from 'supertest'
import type { Express } from 'express'

import { User } from '../../../../core/user/entity/user.entity'
import { database } from '../../../database'
import { hash } from '../../../../shared/utils/password'
import { config } from '../../../../config'
import { bootstrap } from '../../app'

describe('/auth', () => {
  let app: Express
  const password = 'abCD1234'
  const user = new User()
  user.id = 'e8813504-444c-4a34-af4a-6ece9206cc9e'
  user.name = 'John Doe'
  user.username = 'john.doe'
  user.password = hash(password)
  user.createdAt = new Date()
  user.updatedAt = new Date()

  beforeAll(async () => {
    jest
      .spyOn(database, 'initialize')
      .mockImplementation(async () => ({}) as any)
    app = await bootstrap()
  })

  describe('POST /sign-in', () => {
    it('espera retornar erro quando o usuário não existir', async () => {
      jest.spyOn(database.manager, 'findOne').mockResolvedValueOnce(null)
      const body = {
        username: user.username,
        password
      }

      const response = await request(app).post('/api/auth/sign-in').send(body)

      expect(response.status).toBe(401)
      expect(response.body).toEqual({ message: 'Usuário ou senha incorretos' })
      expect(response.headers['set-cookie']).toBeUndefined()
    })

    it('espera retornar erro quando a senha estiver incorreta', async () => {
      jest.spyOn(database.manager, 'findOne').mockResolvedValueOnce(user)
      const body = {
        username: user.username,
        password: 'wrong-password'
      }

      const response = await request(app).post('/api/auth/sign-in').send(body)

      expect(response.status).toBe(401)
      expect(response.body).toEqual({ message: 'Usuário ou senha incorretos' })
      expect(response.headers['set-cookie']).toBeUndefined()
    })

    it('espera retornar o token via cookie quando usuário e senha estiverem corretos', async () => {
      jest.spyOn(database.manager, 'findOne').mockResolvedValueOnce(user)
      const body = {
        username: user.username,
        password
      }

      const response = await request(app).post('/api/auth/sign-in').send(body)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({})
      expect(response.headers['set-cookie'][0]).toContain(config.token.cookie)
    })
  })
})
