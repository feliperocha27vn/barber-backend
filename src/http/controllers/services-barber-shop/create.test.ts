import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { authenticationBarberShop } from '@/utils/tests/authentication-barber-shop'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Create (e2)', () => {
  it('should be able create new service', async () => {
    const { token } = await authenticationBarberShop(app)

    const response = await request(app.server)
      .post('/servicos')
      .send({
        nome: 'Corte',
        preco: 25,
        descricao: 'Corte de cabelo',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(201)
  })
})
