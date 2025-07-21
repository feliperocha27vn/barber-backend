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

describe('Fetch (e2)', () => {
  it('should be able list services', async () => {
    const barberShop = await prisma.barberShop.create({
      data: {
        nome: 'Barbearia do João',
        email: 'contato@barbeariadojoao.com.br',
        senha_hash: await hash('123456', 10),
        area_atendimento: 'Centro',
        CEP: '01310-100',
        estado: 'SP',
        cidade: 'São Paulo',
        bairro: 'Bela Vista',
        logradouro: 'Avenida Paulista',
        numero: '1578',
        complemento: 'Sala 205',
      },
    })

    const service = await prisma.services.create({
      data: {
        nome: 'Corte',
        preco: 25,
        descricao: 'Corte de cabelo',
        barber_shop_id: barberShop.id,
      },
    })

    const responseGetServices = await request(app.server).get(
      `/servico/${barberShop.id}/${service.id}`
    )

    expect(responseGetServices.status).toEqual(200)
    expect(responseGetServices.body.service).toEqual(
      expect.objectContaining({ nome: 'Corte' })
    )
  })
})
