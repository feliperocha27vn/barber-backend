import { PrismaBarberShopRepository } from '@/repositories/prisma/prisma-barber-shop-repository'
import { PrismaServicesBarberShopRepository } from '@/repositories/prisma/prisma-services-barber-shop-repository'
import { GetServiceBarberShopUseCase } from '@/use-cases/services-barber-shop/get-service-barber-shop'

export function makeGetServiceBarberShopUseCase() {
  const prismaBarberShopRepository = new PrismaBarberShopRepository()
  const prismaServicesBarberShopRepository =
    new PrismaServicesBarberShopRepository()
  const getServiceBarberShopUseCase = new GetServiceBarberShopUseCase(
    prismaServicesBarberShopRepository,
    prismaBarberShopRepository
  )

  return getServiceBarberShopUseCase
}
