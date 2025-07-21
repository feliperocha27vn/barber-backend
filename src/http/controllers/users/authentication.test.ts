import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Register (e2)', () => {
  it('deve garantir que a autenticação funcione corretamente para um usuário válido', async () => {
    await prisma.users.create({
      data: {
        nome: 'Felipe',
        email: 'felipe@example.com.br',
        telefone: '123456789',
      },
    })

    const response = await request(app.server)
      .post('/user/authentication')
      .send({
        email: 'felipe@example.com.br',
      })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
