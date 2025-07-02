import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Create (e2)', () => {
  it('should be able create new service', async () => {
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

    const authResponse = await request(app.server)
      .post('/barbearia/login')
      .send({
        email: 'contato@barbeariadojoao.com.br',
        senha: '123456',
      })

    const { token } = authResponse.body

    const response = await request(app.server)
      .post('/servicos')
      .send({
        nome: 'Corte',
        preco: 25,
        descricao: 'Corte de cabelo',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(201)
  })
})
