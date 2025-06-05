import { describe, it, beforeEach, expect } from 'vitest'
import { GetAllBarberShopsUseCase } from './get-all-barber-shops'
import { InMemoryBarberShopRepository } from '@/in-memory/in-memory-barber-shop-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let barberShopRepository: InMemoryBarberShopRepository
let sut: GetAllBarberShopsUseCase

describe('Get all barber shops', () => {
  beforeEach(() => {
    barberShopRepository = new InMemoryBarberShopRepository()
    sut = new GetAllBarberShopsUseCase(barberShopRepository)
  })

  it('deve trazer barbearias de acordo com o filtro', async () => {
    await barberShopRepository.create({
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

    await barberShopRepository.create({
      nome: 'Barber do Armando',
      email: 'contato@barbeariadoarmando.com.br',
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

    const { barberShops } = await sut.execute({
      query: 'Barber',
    })

    expect(barberShops).toEqual([
      expect.objectContaining({ nome: 'Barber do Armando' }),
    ])
  })

  it('deve trazer todas barbearias', async () => {
    await barberShopRepository.create({
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

    await barberShopRepository.create({
      nome: 'Barber do Armando',
      email: 'contato@barbeariadoarmando.com.br',
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

    const { barberShops } = await sut.execute({
      query: '',
    })

    expect(barberShops).toHaveLength(2)
  })

  it('deve garantir que um erro apareça caso não exista barbearias', async () => {
    await expect(() =>
      sut.execute({
        query: '',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
