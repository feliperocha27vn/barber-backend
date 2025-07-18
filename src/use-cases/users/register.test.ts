import { InMemoryUsersRepository } from '@/in-memory/in-memory-users-repository'
import type { UsersRepository } from '@/repositories/users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserEmailAlreadyExistsError } from '../errors/user-email-already-exists-erros'
import { RegisterUserUseCase } from './register'

let sut: RegisterUserUseCase
let usersRepository: UsersRepository

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  it('deve garantir hash da senha', async () => {
    const { user } = await sut.execute({
      email: 'test@example.com',
      nome: 'Test User',
      senha: '123',
    })

    const isPasswordHash = await compare('123', user.senha_hash)
    
    expect(isPasswordHash).toBe(true)
  })

  it('deve garantir que um usuário seja registrado', async () => {
    const {user} = await sut.execute({
        email: 'test@example.com',
        nome: 'Test User',
        senha: '123'
    })

    expect(user).toEqual(expect.objectContaining({
        email: 'test@example.com',
        nome: 'Test User'
    }))
  })

  it('deve garantir que não exista um usuário como mesmo email', async () => {
    await sut.execute({
        email: 'test@example.com',
        nome: 'Test User',
        senha: '123'
    })

    expect(() =>
        sut.execute({
            email: 'test@example.com',
            nome: 'Test User',
            senha: '123'  
        })
    ).rejects.toBeInstanceOf(UserEmailAlreadyExistsError)
  })
})
