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

describe('Create (e2)', () => {
  it('should be able update barber shop phone', async () => {
    const { token, barberShop } = await authenticationBarberShop(app)

    const phoneCreated = await prisma.barberShopPhones.create({
      data: {
        numero: '123456789',
        tipo: 'celular',
        barber_shop_id: barberShop.id,
      },
    })

    const response = await request(app.server)
      .patch(`/telefone/${phoneCreated.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        numero: '987654321',
      })

    expect(response.status).toEqual(204)

    const phone = await prisma.barberShopPhones.findFirstOrThrow({
      where: {
        id: phoneCreated.id,
      },
    })

    expect(phone).toEqual(expect.objectContaining({ numero: '987654321' }))
  })
})
