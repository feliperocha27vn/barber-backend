import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function authenticationBarberShop(app: FastifyInstance) {
  const reponseBarberShop = await request(app.server)
    .post('/barbearia/register')
    .send({
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

  const authResponse = await request(app.server).post('/barbearia/login').send({
    email: 'contato@barbeariadojoao.com.br',
    senha: '123456',
  })
  // git
  const { token } = authResponse.body

  const { barberShop } = reponseBarberShop.body

  return {
    token,
    barberShop,
  }
}
