import { PrismaBarberShopRepository } from '@/repositories/prisma/prisma-barber-shop-repository'
import { RegisterUseCase } from '@/use-cases/barber-shop/register'

export function makeRegisterUseCase() {
  const prismaBarberShopRepository = new PrismaBarberShopRepository()
  const registerUseCase = new RegisterUseCase(prismaBarberShopRepository)

  return registerUseCase
}
