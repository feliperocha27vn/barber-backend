import { describe, it, beforeEach, expect } from 'vitest'
import type { BarberShopRepository } from '@/repositories/barber-shop-repository'
import { InMemoryBarberShopRepository } from '@/in-memory/in-memory-barber-shop-repository'
import { GetBarberShopUseCase } from './get-barber-shop'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let barberShopRepository: BarberShopRepository
let sut: GetBarberShopUseCase

describe('Get barber shop', () => {
  beforeEach(() => {
    barberShopRepository = new InMemoryBarberShopRepository()
    sut = new GetBarberShopUseCase(barberShopRepository)
  })

  it('deve garantir que o usuário seja buscado com sucesso', async () => {
    const barberShopCreated = barberShopRepository.create({
      nome: 'Barbearia do João',
      email: 'contato@barbeariadojoao.com.br',
      senha_hash: await hash('123', 6),
      area_atendimento: 'Centro',
      CEP: '01310-100',
      estado: 'SP',
      cidade: 'São Paulo',
      bairro: 'Bela Vista',
      logradouro: 'Avenida Paulista',
      numero: '1578',
      complemento: 'Sala 205',
    })

    const { barberShop } = await sut.execute({
      barberShopId: (await barberShopCreated).id,
    })

    await expect(barberShop.id).toEqual(expect.any(String))
  })

  it('deve ocorrer um erro caso o id não exista', async () => {
    await expect(() =>
      sut.execute({
        barberShopId: 'id não existente',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
