import { PrismaBarberShopPhonesRepository } from '@/repositories/prisma/prisma-barber-shop-phones-repository'
import { PrismaBarberShopRepository } from '@/repositories/prisma/prisma-barber-shop-repository'
import { FetchPhoneBarberShopUseCase } from '@/use-cases/phones-barber-shop/fetch-phones-barber-shop'

export function makeFetchPhonesBarberShopUseCase() {
  const prismaBarberShopRepository = new PrismaBarberShopRepository()
  const prismaPhonesBarberShopRepository =
    new PrismaBarberShopPhonesRepository()
  const fetchPhoneBarberShopUseCase = new FetchPhoneBarberShopUseCase(
    prismaPhonesBarberShopRepository,
    prismaBarberShopRepository
  )

  return fetchPhoneBarberShopUseCase
}
