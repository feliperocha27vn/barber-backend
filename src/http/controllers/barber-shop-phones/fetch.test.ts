import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { authenticationBarberShop } from '@/utils/tests/authentication-barber-shop'
import { prisma } from '@/lib/prisma'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Fetch (e2)', () => {
  it('should be able list phones by barber shop', async () => {
    const { token, barberShop } = await authenticationBarberShop(app)

    await prisma.barberShopPhones.create({
      data: {
        numero: '123456789',
        tipo: 'celular',
        barber_shop_id: barberShop.id,
      },
    })

    await prisma.barberShopPhones.create({
      data: {
        numero: '36425555',
        tipo: 'fixo',
        barber_shop_id: barberShop.id,
      },
    })

    const responseFetchPhones = await request(app.server)
      .get('/telefones')
      .set('Authorization', `Bearer ${token}`)

    expect(responseFetchPhones.status).toEqual(200)
    expect(responseFetchPhones.body.phoneBarberShop).toEqual([
      expect.objectContaining({ numero: '123456789' }),
      expect.objectContaining({ numero: '36425555' }),
    ])
  })
})
