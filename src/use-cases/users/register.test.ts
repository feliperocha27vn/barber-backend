import { InMemoryUsersRepository } from '@/in-memory/in-memory-users-repository'
import type { UsersRepository } from '@/repositories/users-repository'
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

  it('deve garantir que um usuário seja registrado', async () => {
    const { user } = await sut.execute({
      email: 'test@example.com',
      nome: 'Test User',
      telefone: '123456789',
    })

    expect(user).toEqual(
      expect.objectContaining({
        email: 'test@example.com',
        nome: 'Test User',
      })
    )
  })

  it('deve garantir que não é possível criar um usuário com o mesmo email', async () => {
    await sut.execute({
      email: 'test@example.com',
      nome: 'Test User',
      telefone: '123456789',
    })

    expect(() =>
      sut.execute({
        email: 'test@example.com',
        nome: 'Test User',
        telefone: '123456789',
      })
    ).rejects.toBeInstanceOf(UserEmailAlreadyExistsError)
  })
})
