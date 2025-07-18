import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '@/use-cases/users/authenticate'

export function makeAuthenticationUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUserUseCase = new AuthenticateUserUseCase(
    prismaUsersRepository
  )

  return authenticateUserUseCase
}
