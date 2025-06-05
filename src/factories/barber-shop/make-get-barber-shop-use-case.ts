import { PrismaBarberShopRepository } from '@/repositories/prisma/prisma-barber-shop-repository'
import { GetBarberShopUseCase } from '@/use-cases/barber-shop/get-barber-shop'

export function makeGetBarberShopUseCase() {
  const prismaBarberShopRepository = new PrismaBarberShopRepository()
  const getBarberShopUseCase = new GetBarberShopUseCase(
    prismaBarberShopRepository
  )

  return getBarberShopUseCase
}
