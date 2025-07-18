import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Login (e2)', () => {
  it('should be able login', async () => {
    await request(app.server).post('/barbearia/register').send({
      nome: 'Barbearia do João',
      email: 'contato@barbeariadojoao.com.br',
      senha: '123456',
      area_atendimento: 'Centro',
      CEP: '01310-100',
      estado: 'SP',
      cidade: 'São Paulo',
      bairro: 'Bela Vista',
      logradouro: 'Avenida Paulista',
      numero: '1578',
      complemento: 'Sala 205',
    })

    const response = await request(app.server).post('/barbearia/login').send({
      email: 'contato@barbeariadojoao.com.br',
      senha: '123456',
    })

    expect(response.status).toEqual(200)
  })
})
