import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryServicesBarberShopRepository } from '@/in-memory/in-memory-services-barber-shop-repository'
import { GetServiceBarberShopUseCase } from './get-service-barber-shop'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryBarberShopRepository } from '@/in-memory/in-memory-barber-shop-repository'
import { hash } from 'bcryptjs'

let servicesBarberShopRepository: InMemoryServicesBarberShopRepository
let barberShopRepository: InMemoryBarberShopRepository
let sut: GetServiceBarberShopUseCase

describe('Create service use case', () => {
  beforeEach(() => {
    barberShopRepository = new InMemoryBarberShopRepository()
    servicesBarberShopRepository = new InMemoryServicesBarberShopRepository()
    sut = new GetServiceBarberShopUseCase(
      servicesBarberShopRepository,
      barberShopRepository
    )
  })

  it('deve garantir que um erro ocorra caso o serviço não exista', async () => {
    await expect(() =>
      sut.execute({
        idBarberShop: 'barber-shop-no-exists',
        idService: 'service-no-exists',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('deve garantir que um serviço seja retornado com sucesso', async () => {
    await barberShopRepository.create({
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

    await servicesBarberShopRepository.create({
      id: 'service-1',
      barber_shop_id: 'barber-shop-1',
      nome: 'Corte de cabelo',
      preco: 50,
    })

    const { service } = await sut.execute({
      idBarberShop: 'barber-shop-1',
      idService: 'service-1',
    })

    expect(service.id).toEqual(expect.any(String))
  })
})
