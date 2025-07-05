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

describe('Delete (e2)', () => {
  it('should be able delete service', async () => {
    const { token, barberShop } = await authenticationBarberShop(app)

    const service = await prisma.services.create({
      data: {
        nome: 'Corte',
        preco: 25,
        descricao: 'Corte de cabelo',
        barber_shop_id: barberShop.id,
      },
    })

    const responseDelete = await request(app.server)
      .delete(`/servico/${service.id}`)
      .send()
      .set('Authorization', `Bearer ${token}`)

    expect(responseDelete.status).toEqual(200)
  })
})
