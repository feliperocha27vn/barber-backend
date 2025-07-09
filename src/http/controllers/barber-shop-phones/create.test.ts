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
  it('should be able create new phone barber shop', async () => {
    const { token, barberShop } = await authenticationBarberShop(app)

    const response = await request(app.server)
      .post('/telefone')
      .send({
        numero: '123456789',
        tipo: 'celular',
        barberShopId: barberShop.id,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(201)
  })
})
