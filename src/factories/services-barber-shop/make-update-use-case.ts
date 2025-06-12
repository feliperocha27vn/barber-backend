import { PrismaBarberShopRepository } from '@/repositories/prisma/prisma-barber-shop-repository'
import { PrismaServicesBarberShopRepository } from '@/repositories/prisma/prisma-services-barber-shop-repository'
import { UpdateServiceBarberShopUseCase } from '@/use-cases/services-barber-shop/update'

export function makeUpdateServiceBarberShopUseCase() {
  const prismaBarberShopRepository = new PrismaBarberShopRepository()
  const prismaServicesBarberShopRepository =
    new PrismaServicesBarberShopRepository()
  const updateServiceBarberShopUseCase = new UpdateServiceBarberShopUseCase(
    prismaServicesBarberShopRepository,
    prismaBarberShopRepository
  )

  return updateServiceBarberShopUseCase
}
