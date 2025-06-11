import { PrismaServicesBarberShopRepository } from '@/repositories/prisma/prisma-services-barber-shop-repository'
import { CreateServiceBarberShopUseCase } from '@/use-cases/services-barber-shop/create'

export function makeCreateServiceBarberShopUseCase() {
  const prismaServicesBarberShopRepository =
    new PrismaServicesBarberShopRepository()
  const createServiceBarberShopUseCase = new CreateServiceBarberShopUseCase(
    prismaServicesBarberShopRepository
  )

  return createServiceBarberShopUseCase
}
