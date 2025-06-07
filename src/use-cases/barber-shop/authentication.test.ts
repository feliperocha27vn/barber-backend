import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryBarberShopRepository } from '@/in-memory/in-memory-barber-shop-repository'
import { AuthenticationUseCase } from './authentication'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { hash } from 'bcryptjs'

let barberShopRepository: InMemoryBarberShopRepository
let sut: AuthenticationUseCase

describe('Barber Shop Authentication Use Case', () => {
  beforeEach(() => {
    barberShopRepository = new InMemoryBarberShopRepository()
    sut = new AuthenticationUseCase(barberShopRepository)
  })

  it('deve garantir erro de autenticação com email inválido', async () => {
    await expect(() =>
      sut.execute({
        email: 'invalid-email',
        senha: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('deve garantir erro de autenticação com senha inválida', async () => {
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

    await expect(() =>
      sut.execute({
        email: 'contato@barbeariadojoao.com.br',
        senha: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('deve autenticar com sucesso', async () => {
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

    const { barberShop } = await sut.execute({
      email: 'contato@barbeariadojoao.com.br',
      senha: '123',
    })

    expect(barberShop.id).toEqual(expect.any(String))
  })
})
