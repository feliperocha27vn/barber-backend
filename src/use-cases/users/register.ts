import type { UsersRepository } from '@/repositories/users-repository'
import type { Users } from '@prisma/client'
import { UserEmailAlreadyExistsError } from '../errors/user-email-already-exists-erros'

interface RegisterUseCaseRequest {
  nome: string
  email: string
  telefone: string
}

interface RegisterUseCaseResponse {
  user: Users
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    nome,
    email,
    telefone,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userExists = await this.usersRepository.findByEmail(email)
    if (userExists) {
      throw new UserEmailAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      nome,
      email,
      telefone,
    })

    return {
      user,
    }
  }
}
