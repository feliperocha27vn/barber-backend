import { PrismaBarberShopRepository } from '@/repositories/prisma/prisma-barber-shop-repository'
import { PrismaServicesBarberShopRepository } from '@/repositories/prisma/prisma-services-barber-shop-repository'
import { FetchServicesBarberShopsUseCase } from '@/use-cases/services-barber-shop/fetch-services-barber-shops'

export function makeFetchServiceBarberShopUseCase() {
  const prismaBarberShopRepository = new PrismaBarberShopRepository()
  const prismaServicesBarberShopRepository =
    new PrismaServicesBarberShopRepository()
  const fetchServiceBarberShopUseCase = new FetchServicesBarberShopsUseCase(
    prismaServicesBarberShopRepository,
    prismaBarberShopRepository
  )

  return fetchServiceBarberShopUseCase
}
