import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryBarberShopRepository } from '@/in-memory/in-memory-barber-shop-repository'
import { hash } from 'bcryptjs'
import { DeletePhoneBarberShopUseCase } from './delete'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import type { PhonesBarberShopRepository } from '@/repositories/phones-barber-shop-repository'
import { InMemoryPhonesBarberShopRepository } from '@/in-memory/in-memory-phones-barber-shop-repository'

let phonesBarberShopRepository: PhonesBarberShopRepository
let barberShopRepository = new InMemoryBarberShopRepository()
let sut: DeletePhoneBarberShopUseCase

describe('Delete service use case', () => {
  beforeEach(() => {
    barberShopRepository = new InMemoryBarberShopRepository()
    phonesBarberShopRepository = new InMemoryPhonesBarberShopRepository()
    sut = new DeletePhoneBarberShopUseCase(
      phonesBarberShopRepository,
      barberShopRepository
    )
  })

  it('deve garantir que o telefone da barbearia seja excluído', async () => {
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

    await phonesBarberShopRepository.create({
      id: 'phone-1',
      numero: '123456789',
      tipo: 'celular',
      barber_shop_id: 'barber-shop-1',
    })

    expect(() =>
      sut.execute({
        idBarberShop: 'barber-shop-1',
        idBarberShopPhone: 'phone-1',
      })
    ).toHaveLength(0)
  })

  it('deve garantir que um erro ocorra caso o a barbearia não exista', async () => {
    await expect(() =>
      sut.execute({
        idBarberShop: 'barber-shop-no-exists',
        idBarberShopPhone: 'service-no-exists',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
