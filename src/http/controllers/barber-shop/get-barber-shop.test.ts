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

describe('Login (e2)', () => {
  it('should be able get barber shop', async () => {
    const { token } = await authenticationBarberShop(app)

    const response = await request(app.server)
      .get('/barbearia/get-barber-shop')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
  })
})
