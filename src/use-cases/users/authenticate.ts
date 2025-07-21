import type { UsersRepository } from '@/repositories/users-repository'
import type { Users } from '@prisma/client'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface AuthenticateUserRequest {
  email: string
}

interface AuthenticateUserResponse {
  user: Users
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
