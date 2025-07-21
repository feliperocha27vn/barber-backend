import { InMemoryUsersRepository } from '@/in-memory/in-memory-users-repository'
import type { UsersRepository } from '@/repositories/users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AuthenticateUserUseCase } from './authenticate'

let sut: AuthenticateUserUseCase
let usersRepository: UsersRepository

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(usersRepository)
  })

  it('deve garantir que o usuário seja autenticado', async () => {
    await usersRepository.create({
      id: 'user-id',
      nome: 'Test User',
      email: 'test@example.com',
      telefone: '123456789',
    })

    const { user } = await sut.execute({
      email: 'test@example.com',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('deve garantir que o usuário não seja autenticado caso o email não existir', async () => {
    expect(() =>
      sut.execute({
        email: 'wrong@example.com',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
