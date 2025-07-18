import type { UsersRepository } from '@/repositories/users-repository'
import type { Users } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface AuthenticateUserRequest {
  email: string
  senha: string
}

interface AuthenticateUserResponse {
  user: Users
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    senha,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(senha, user.senha_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
