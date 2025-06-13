import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryServicesBarberShopRepository } from '@/in-memory/in-memory-services-barber-shop-repository'
import type { ServicesBarberShopRepository } from '@/repositories/services-barber-shop-repository'
import { InMemoryBarberShopRepository } from '@/in-memory/in-memory-barber-shop-repository'
import { hash } from 'bcryptjs'
import { DeleteServiceBarberShopUseCase } from './delete'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let servicesBarberShopRepository: ServicesBarberShopRepository
let barberShopRepository = new InMemoryBarberShopRepository()
let sut: DeleteServiceBarberShopUseCase

describe('Delete service use case', () => {
  beforeEach(() => {
    barberShopRepository = new InMemoryBarberShopRepository()
    servicesBarberShopRepository = new InMemoryServicesBarberShopRepository()
    sut = new DeleteServiceBarberShopUseCase(
      servicesBarberShopRepository,
      barberShopRepository
    )
  })

  it('deve garantir que o serviço seja excluído', async () => {
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

    await servicesBarberShopRepository.create({
      id: 'service-1',
      nome: 'Corte de Cabelo',
      descricao: 'Corte de cabelo masculino',
      preco: 50,
      barber_shop_id: 'barber-shop-1',
    })

    await expect(() =>
      sut.execute({
        idBarberShop: 'barber-shop-1',
        idService: 'service-1',
      })
    ).toHaveLength(0)
  })

  it('deve garantir que um erro ocorra caso o serviço não exista', async () => {
    await expect(() =>
      sut.execute({
        idBarberShop: 'barber-shop-no-exists',
        idService: 'service-no-exists',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
