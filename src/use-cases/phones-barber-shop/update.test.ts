import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryBarberShopRepository } from '@/in-memory/in-memory-barber-shop-repository'
import { hash } from 'bcryptjs'
import type { PhonesBarberShopRepository } from '@/repositories/phones-barber-shop-repository'
import { UpdatePhoneBarberShopUseCase } from './update'
import { InMemoryPhonesBarberShopRepository } from '@/in-memory/in-memory-phones-barber-shop-repository'

let phoneBarberShopRepository: PhonesBarberShopRepository
let barberShopRepository: InMemoryBarberShopRepository
let sut: UpdatePhoneBarberShopUseCase

describe('Update service use case', () => {
  beforeEach(() => {
    barberShopRepository = new InMemoryBarberShopRepository()
    phoneBarberShopRepository = new InMemoryPhonesBarberShopRepository()
    sut = new UpdatePhoneBarberShopUseCase(
      phoneBarberShopRepository,
      barberShopRepository
    )
  })

  it('deve garantir que o telefone seja atualizado', async () => {
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

    await phoneBarberShopRepository.create({
      id: 'phone-1',
      numero: '123456789',
      tipo: 'celular',
      barber_shop_id: 'barber-shop-1',
    })

    const { phone } = await sut.execute({
      idBarberShop: 'barber-shop-1',
      idBarberShopPhone: 'phone-1',
      data: {
        numero: '987654321',
      },
    })

    expect(phone).toEqual(expect.objectContaining({ numero: '987654321' }))
  })
})
