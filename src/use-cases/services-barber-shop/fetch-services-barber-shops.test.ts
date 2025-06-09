import { describe, beforeEach, it, expect } from 'vitest'
import { FetchServicesBarberShopsUseCase } from './fetch-services-barber-shops'
import { InMemoryServicesBarberShopRepository } from '@/in-memory/in-memory-services-barber-shop-repository'
import { InMemoryBarberShopRepository } from '@/in-memory/in-memory-barber-shop-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let servicesBarberShopRepository: InMemoryServicesBarberShopRepository
let sut: FetchServicesBarberShopsUseCase
let barberShopRepository: InMemoryBarberShopRepository

describe('Create service use case', () => {
  beforeEach(() => {
    barberShopRepository = new InMemoryBarberShopRepository()
    servicesBarberShopRepository = new InMemoryServicesBarberShopRepository()
    sut = new FetchServicesBarberShopsUseCase(
      servicesBarberShopRepository,
      barberShopRepository
    )
  })

  it('deve garantir que os serviços sejam buscados', async () => {
    const barberShop = await barberShopRepository.create({
      id: 'barber-01',
      nome: 'Barbearia do João',
      email: 'contato@barbeariadojoao.com.br',
      senha_hash: await hash('123', 6),
      area_atendimento: 'Centro',
      CEP: '01310-10',
      estado: 'SP',
      cidade: 'São Paulo',
      bairro: 'Bela Vista',
      logradouro: 'Avenida Paulista',
      numero: '1578',
      complemento: 'Sala 205',
    })

    await servicesBarberShopRepository.create({
      id: 'service-1',
      nome: 'Corte de cabelo',
      descricao: 'Corte de cabelo masculino',
      preco: 50,
      barber_shop_id: 'barber-01',
    })

    await servicesBarberShopRepository.create({
      id: 'service-2',
      nome: 'Corte cabelo e barba',
      descricao: 'Corte de cabelo masculino',
      preco: 50,
      barber_shop_id: 'barber-01',
    })

    const { services } = await sut.execute({
      idBarberShop: barberShop.id,
    })

    expect(services).toHaveLength(2)
    expect(services).toEqual([
      expect.objectContaining({ id: 'service-1' }),
      expect.objectContaining({ id: 'service-2' }),
    ])
  })

  it('deve garantir que um erro ocorra caso não exista barbearia', async () => {
    await expect(() =>
      sut.execute({
        idBarberShop: 'no-exists',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
