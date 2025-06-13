import { PrismaBarberShopRepository } from '@/repositories/prisma/prisma-barber-shop-repository'
import { PrismaServicesBarberShopRepository } from '@/repositories/prisma/prisma-services-barber-shop-repository'
import { DeleteServiceBarberShopUseCase } from '@/use-cases/services-barber-shop/delete'

export function makeDeleteServiceBarberShopUseCase() {
  const prismaBarberShopRepository = new PrismaBarberShopRepository()
  const prismaServicesBarberShopRepository =
    new PrismaServicesBarberShopRepository()
  const deleteServiceBarberShopUseCase = new DeleteServiceBarberShopUseCase(
    prismaServicesBarberShopRepository,
    prismaBarberShopRepository
  )

  return deleteServiceBarberShopUseCase
}
