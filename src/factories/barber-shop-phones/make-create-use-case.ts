import { PrismaBarberShopPhonesRepository } from '@/repositories/prisma/prisma-barber-shop-phones-repository'
import { PrismaBarberShopRepository } from '@/repositories/prisma/prisma-barber-shop-repository'
import { CreatePhoneBarberShopUseCase } from '@/use-cases/phones-barber-shop/create'

export function makeCreatePhoneBarberShopUseCase() {
  const prismaBarberShopRepository = new PrismaBarberShopRepository()
  const prismaPhoneBarberShopRepository = new PrismaBarberShopPhonesRepository()
  const createPhoneBarberShopUseCase = new CreatePhoneBarberShopUseCase(
    prismaPhoneBarberShopRepository,
    prismaBarberShopRepository
  )

  return createPhoneBarberShopUseCase
}
