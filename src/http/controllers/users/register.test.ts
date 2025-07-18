import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Register (e2)', () => {
  it('deve garantir o registro bem-sucedido', async () => {
    const response = await request(app.server).post('/users/register').send({
      nome: 'Felipe',
      email: 'felipe@example.com.br',
      senha: '123456',
    })

    expect(response.status).toEqual(201)
  })
})
