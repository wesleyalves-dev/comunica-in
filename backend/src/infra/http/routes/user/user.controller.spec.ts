import request from 'supertest'
import type { Express } from 'express'
import jwt from 'jsonwebtoken'

import { User } from '../../../../core/user/entity/user.entity'
import { database } from '../../../database'
import { bootstrap } from '../../app'
import { config } from '../../../../config'

describe('/users', () => {
  let app: Express
  const user = new User()
  user.id = 'e8813504-444c-4a34-af4a-6ece9206cc9e'
  user.name = 'John Doe'
  user.username = 'john.doe'
  user.password = 'password'
  user.createdAt = new Date()
  user.updatedAt = new Date()
  const cookies = [`${config.token.cookie}=fake-token`]

  beforeAll(async () => {
    jest
      .spyOn(database, 'initialize')
      .mockImplementation(async () => ({}) as any)
    jest.spyOn(jwt, 'verify').mockReturnValue()
    app = await bootstrap()
  })

  describe('GET /', () => {
    it('espera retornar um array de users', async () => {
      jest.spyOn(database.manager, 'find').mockResolvedValueOnce([user])

      const response = await request(app)
        .get('/api/users')
        .set('Cookie', cookies)

      expect(response.status).toBe(200)
      expect(response.body).toEqual([
        {
          id: user.id,
          name: user.name,
          username: user.username,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString()
        }
      ])
    })
  })

  describe('GET /:id', () => {
    it('espera retornar um objeto de user', async () => {
      jest.spyOn(database.manager, 'findOne').mockResolvedValueOnce(user)

      const response = await request(app)
        .get(`/api/users/${user.id}`)
        .set('Cookie', cookies)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        id: user.id,
        name: user.name,
        username: user.username,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      })
    })
  })

  describe('POST /', () => {
    it('espera cadastrar e retornar um user', async () => {
      jest.spyOn(database.manager, 'create').mockReturnValueOnce(user as any)
      jest.spyOn(database.manager, 'save').mockResolvedValueOnce(user)
      const body = {
        name: user.name,
        username: user.username,
        password: 'HardP4ssw0rd'
      }

      const response = await request(app)
        .post('/api/users')
        .set('Cookie', cookies)
        .send(body)

      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        id: user.id,
        name: user.name,
        username: user.username,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      })
    })
  })

  describe('PUT /:id', () => {
    it('espera atualizar e retornar um user', async () => {
      jest.spyOn(database.manager, 'create').mockReturnValueOnce(user as any)
      jest
        .spyOn(database.manager, 'update')
        .mockResolvedValue({ raw: '', generatedMaps: [] })
      const body = {
        name: 'New Name'
      }
      jest.spyOn(database.manager, 'findOne').mockResolvedValueOnce(user)

      const response = await request(app)
        .put(`/api/users/${user.id}`)
        .set('Cookie', cookies)
        .send(body)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        id: user.id,
        name: user.name,
        username: user.username,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      })
    })
  })

  describe('DELETE /:id', () => {
    it('espera excluir um user', async () => {
      const deleteSpy = jest
        .spyOn(database.manager, 'delete')
        .mockResolvedValueOnce({ raw: '' })

      const response = await request(app)
        .delete(`/api/users/${user.id}`)
        .set('Cookie', cookies)

      expect(response.status).toBe(204)
      expect(deleteSpy).toHaveBeenCalled()
    })
  })
})
