import { InMemoryBarberShopRepository } from '@/in-memory/in-memory-barber-shop-repository'
import { InMemoryPhonesBarberShopRepository } from '@/in-memory/in-memory-phones-barber-shop-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePhoneBarberShopUseCase } from './create'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let barberShopRepository = new InMemoryBarberShopRepository()
let phonesBarberShopRepository = new InMemoryPhonesBarberShopRepository()
let sut: CreatePhoneBarberShopUseCase

describe('Create phone barber shop use case', () => {
  beforeEach(() => {
    barberShopRepository = new InMemoryBarberShopRepository()
    phonesBarberShopRepository = new InMemoryPhonesBarberShopRepository()
    sut = new CreatePhoneBarberShopUseCase(
      phonesBarberShopRepository,
      barberShopRepository
    )
  })

  it('deve garantir que o telefone seja criado', async () => {
    barberShopRepository.create({
      id: 'barber-shop-1',
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

    const { phoneBarberShop } = await sut.execute({
      numero: '123456789',
      tipo: 'celular',
      barberShopId: 'barber-shop-1',
    })

    expect(phoneBarberShop.id).toEqual(expect.any(String))
  })

  it('deve garantir que o telefone não seja criado, se não existir a barbearia', async () => {
    await expect(() =>
      sut.execute({
        numero: '123456789',
        tipo: 'celular',
        barberShopId: 'no-exists-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
