import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

beforeAll(async () => {
  await app.ready()

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
})

afterAll(async () => {
  await app.close()
})

describe('Fetch barbershop (e2)', () => {
  it('should be able fetch barber shops', async () => {
    const response = await request(app.server).get(
      '/barbearia/fetch-barber-shops'
    )

    expect(response.status).toEqual(200)
  })
})
