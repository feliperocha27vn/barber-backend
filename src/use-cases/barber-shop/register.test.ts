import { InMemoryBarberShopRepository } from '@/in-memory/in-memory-barber-shop-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import type { BarberShopRepository } from '@/repositories/barber-shop-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExists } from '../errors/user-already-exists-error'

let barberShopRepository: BarberShopRepository
let sut: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    barberShopRepository = new InMemoryBarberShopRepository()
    sut = new RegisterUseCase(barberShopRepository)
  })

  it('deve garantir o hash da senha', async () => {
    const { barberShop } = await sut.execute({
      nome: 'Barbearia do João',
      email: 'contato@barbeariadojoao.com.br',
      senha: '123',
      area_atendimento: 'Centro',
      CEP: '01310-100',
      estado: 'SP',
      cidade: 'São Paulo',
      bairro: 'Bela Vista',
      logradouro: 'Avenida Paulista',
      numero: '1578',
      complemento: 'Sala 205',
    })

    const isPasswordHash = await compare('123', barberShop.senha_hash)

    expect(isPasswordHash).toBe(true)
  })

  it('deve garantir que não existe um usuário com mesmo email', async () => {
    const { barberShop } = await sut.execute({
      nome: 'Barbearia do João',
      email: 'contato@barbeariadojoao.com.br',
      senha: '123',
      area_atendimento: 'Centro',
      CEP: '01310-100',
      estado: 'SP',
      cidade: 'São Paulo',
      bairro: 'Bela Vista',
      logradouro: 'Avenida Paulista',
      numero: '1578',
      complemento: 'Sala 205',
    })

    await expect(() =>
      sut.execute({
        nome: 'Barbearia do João',
        email: 'contato@barbeariadojoao.com.br',
        senha: '123',
        area_atendimento: 'Centro',
        CEP: '01310-100',
        estado: 'SP',
        cidade: 'São Paulo',
        bairro: 'Bela Vista',
        logradouro: 'Avenida Paulista',
        numero: '1578',
        complemento: 'Sala 205',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExists)
  })
})
