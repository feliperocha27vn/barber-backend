import { PrismaBarberShopRepository } from '@/repositories/prisma/prisma-barber-shop-repository'
import { AuthenticationUseCase } from '@/use-cases/barber-shop/authentication'

export function makeAuthenticationUseCase() {
  const prismaBarberShopRepository = new PrismaBarberShopRepository()
  const authenticationUseCase = new AuthenticationUseCase(
    prismaBarberShopRepository
  )

  return authenticationUseCase
}
