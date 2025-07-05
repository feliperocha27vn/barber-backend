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

describe('Update (e2)', () => {
  it('should be able update a service', async () => {
    const { token, barberShop } = await authenticationBarberShop(app)

    const service = await prisma.services.create({
      data: {
        nome: 'Corte de cabelo',
        preco: 25,
        descricao: 'Corte de cabelo sem sobrancelha',
        barber_shop_id: barberShop.id,
      },
    })

    const responseUpdate = await request(app.server)
      .patch('/servico')
      .send({
        idService: service.id,
        nome: 'Corte e sobrancelha',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(responseUpdate.status).toEqual(204)

    const serviceUpdated = await prisma.services.findFirstOrThrow({
      where: {
        id: service.id,
      },
    })

    expect(serviceUpdated).toEqual(
      expect.objectContaining({
        nome: 'Corte e sobrancelha',
      })
    )
  })
})
