import { describe, beforeEach, it, expect } from 'vitest'
import { FetchServicesBarberShopsUseCase } from './fetch-services-barber-shops'
import { InMemoryServicesBarberShopRepository } from '@/in-memory/in-memory-services-barber-shop-repository'

let servicesBarberShopRepository: InMemoryServicesBarberShopRepository
let sut: FetchServicesBarberShopsUseCase

describe('Create service use case', () => {
  beforeEach(() => {
    servicesBarberShopRepository = new InMemoryServicesBarberShopRepository()
    sut = new FetchServicesBarberShopsUseCase(servicesBarberShopRepository)
  })

  it('deve garantir que os serviços sejam buscados', async () => {
    await servicesBarberShopRepository.create({
      id: 'service-1',
      nome: 'Corte de cabelo',
      descricao: 'Corte de cabelo masculino',
      preco: 50,
      barber_shop_id: 'barber-shop-1',
    })

    await servicesBarberShopRepository.create({
      id: 'service-2',
      nome: 'Corte cabelo e barba',
      descricao: 'Corte de cabelo masculino',
      preco: 50,
      barber_shop_id: 'barber-shop-2',
    })

    const { services } = await sut.execute()

    expect(services).toHaveLength(2)
    expect(services).toEqual([
      expect.objectContaining({ id: 'service-1' }),
      expect.objectContaining({ id: 'service-2' }),
    ])
  })
})
