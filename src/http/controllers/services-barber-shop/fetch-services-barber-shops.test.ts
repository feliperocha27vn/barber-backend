import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Fetch (e2)', () => {
  it('should be able list services', async () => {
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

    const serviceResponse = await request(app.server)
      .post('/servicos')
      .send({
        nome: 'Corte',
        preco: 25,
        descricao: 'Corte de cabelo',
      })
      .set('Authorization', `Bearer ${token}`)

    const responseFetchServices = await request(app.server)
      .get('/servicos')
      .send()
      .set('Authorization', `Bearer ${token}`)

    expect(responseFetchServices.status).toEqual(200)
    expect(responseFetchServices.body.services).toEqual([
      expect.objectContaining({ nome: 'Corte' }),
    ])
  })
})
