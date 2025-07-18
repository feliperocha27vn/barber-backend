import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
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
    await prisma.users.create({
      data: {
        nome: 'Felipe',
        email: 'felipe@example.com.br',
        senha_hash: await hash('123456', 6),
      },
    })

    const response = await request(app.server)
      .post('/user/authentication')
      .send({
        email: 'felipe@example.com.br',
        senha: '123456',
      })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
