import { InMemoryBarberShopRepository } from '@/in-memory/in-memory-barber-shop-repository'
import { InMemoryPhonesBarberShopRepository } from '@/in-memory/in-memory-phones-barber-shop-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { FetchPhoneBarberShopUseCase } from './fetch-phones-barber-shop'

let barberShopRepository = new InMemoryBarberShopRepository()
let phonesBarberShopRepository = new InMemoryPhonesBarberShopRepository()
let sut: FetchPhoneBarberShopUseCase

describe('Fetch phone barber shop use case', () => {
  beforeEach(() => {
    barberShopRepository = new InMemoryBarberShopRepository()
    phonesBarberShopRepository = new InMemoryPhonesBarberShopRepository()
    sut = new FetchPhoneBarberShopUseCase(
      phonesBarberShopRepository,
      barberShopRepository
    )
  })

  it('deve garantir que os telefones de uma barbearia seja buscado', async () => {
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

    phonesBarberShopRepository.create({
      id: 'phone-1',
      numero: '123456789',
      tipo: 'celular',
      barber_shop_id: 'barber-shop-1',
    })

    phonesBarberShopRepository.create({
      id: 'phone-2',
      numero: '123456710',
      tipo: 'celular',
      barber_shop_id: 'barber-shop-1',
    })

    const { phoneBarberShop } = await sut.execute({
      barberShopId: 'barber-shop-1',
    })

    expect(phoneBarberShop).toHaveLength(2)
    expect(phoneBarberShop).toEqual([
      expect.objectContaining({ id: 'phone-1' }),
      expect.objectContaining({ id: 'phone-2' }),
    ])
  })

  it('deve retornar um array vazio se a barbearia não tiver telefones', async () => {
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
      barberShopId: 'barber-shop-1',
    })

    expect(phoneBarberShop).toHaveLength(0)
  })

  it('deve retornar um erro se a barbearia não existir', async () => {
    await expect(() =>
      sut.execute({ barberShopId: 'no-exists' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
