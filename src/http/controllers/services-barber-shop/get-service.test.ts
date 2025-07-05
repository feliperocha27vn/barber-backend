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
  it('should be able list services', async () => {
    const { token, barberShop } = await authenticationBarberShop(app)

    const service = await prisma.services.create({
      data: {
        nome: 'Corte',
        preco: 25,
        descricao: 'Corte de cabelo',
        barber_shop_id: barberShop.id,
      },
    })

    const responseFetchServices = await request(app.server)
      .get(`/servico/${service.id}`)
      .send()
      .set('Authorization', `Bearer ${token}`)

    expect(responseFetchServices.status).toEqual(200)
    expect(responseFetchServices.body.service).toEqual(
      expect.objectContaining({ nome: 'Corte' })
    )
  })
})
