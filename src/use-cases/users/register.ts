import type { UsersRepository } from '@/repositories/users-repository'
import type { Users } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserEmailAlreadyExistsError } from '../errors/user-email-already-exists-erros'

interface RegisterUseCaseRequest {
  nome: string
  email: string
  senha: string
}

interface RegisterUseCaseResponse {
  user: Users
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    nome,
    email,
    senha,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const senha_hash = await hash(senha, 10)

    const userExists = await this.usersRepository.findByEmail(email)
    if (userExists) {
      throw new UserEmailAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      nome,
      email,
      senha_hash,
    })

    return {
      user,
    }
  }
}
