import { describe, beforeEach, it, expect } from 'vitest'
import { CreateServiceBarberShopUseCase } from './create'
import { InMemoryServicesBarberShopRepository } from '@/in-memory/in-memory-services-barber-shop-repository'
import type { ServicesBarberShopRepository } from '@/repositories/services-barber-shop-repository'
import { InMemoryBarberShopRepository } from '@/in-memory/in-memory-barber-shop-repository'
import { hash } from 'bcryptjs'

let servicesBarberShopRepository: ServicesBarberShopRepository
let barberShopRepository = new InMemoryBarberShopRepository()
let sut: CreateServiceBarberShopUseCase

describe('Create service use case', () => {
  beforeEach(() => {
    barberShopRepository = new InMemoryBarberShopRepository()
    servicesBarberShopRepository = new InMemoryServicesBarberShopRepository()
    sut = new CreateServiceBarberShopUseCase(
      servicesBarberShopRepository,
      barberShopRepository
    )
  })

  it('deve garantir que o serviço seja criado', async () => {
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

    const { service } = await sut.execute({
      nome: 'Corte de cabelo',
      descricao: 'Corte de cabelo masculino',
      preco: 50,
      barberShopId: 'barber-shop-1',
    })

    expect(service.id).toEqual(expect.any(String))
  })
})
