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

describe('Delete (e2)', () => {
  it('should be able delete service', async () => {
    const { token } = await authenticationBarberShop(app)

    const serviceResponse = await request(app.server)
      .post('/servicos')
      .send({
        nome: 'Corte',
        preco: 25,
        descricao: 'Corte de cabelo',
      })
      .set('Authorization', `Bearer ${token}`)

    const { service } = serviceResponse.body

    const responseDelete = await request(app.server)
      .delete(`/servico/${service.id}`)
      .send()
      .set('Authorization', `Bearer ${token}`)

    expect(responseDelete.status).toEqual(200)
  })
})
