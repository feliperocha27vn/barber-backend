import { InMemoryUsersRepository } from '@/in-memory/in-memory-users-repository'
import type { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
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
      senha_hash: await hash('12345', 6),
    })

    const { user } = await sut.execute({
      email: 'test@example.com',
      senha: '12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('deve garantir que o usuário não seja autenticado caso o email não existir', async () => {
    expect(() =>
      sut.execute({
        email: 'wrong@example.com',
        senha: '12345',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('deve garantir que o usuário não seja autenticado caso estiver errada', async () => {
    await usersRepository.create({
      id: 'user-id',
      nome: 'Test User',
      email: 'test@example.com',
      senha_hash: await hash('12345', 6),
    })

    expect(() =>
      sut.execute({
        email: 'test@example.com',
        senha: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
