import { PrismaBarberShopRepository } from '@/repositories/prisma/prisma-barber-shop-repository'
import { PrismaServicesBarberShopRepository } from '@/repositories/prisma/prisma-services-barber-shop-repository'
import { CreateServiceBarberShopUseCase } from '@/use-cases/services-barber-shop/create'

export function makeCreateServiceBarberShopUseCase() {
  const prismaBarberShopRepository = new PrismaBarberShopRepository()
  const prismaServicesBarberShopRepository =
    new PrismaServicesBarberShopRepository()
  const createServiceBarberShopUseCase = new CreateServiceBarberShopUseCase(
    prismaServicesBarberShopRepository,
    prismaBarberShopRepository
  )

  return createServiceBarberShopUseCase
}
