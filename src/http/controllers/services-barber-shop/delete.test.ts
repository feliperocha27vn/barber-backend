import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('Delete (e2)', () => {
  it('should be able delete service', async () => {
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

    const { service } = serviceResponse.body

    const responseDelete = await request(app.server)
      .delete(`/servico/${service.id}`)
      .send()
      .set('Authorization', `Bearer ${token}`)

    expect(responseDelete.status).toEqual(200)
  })
})
