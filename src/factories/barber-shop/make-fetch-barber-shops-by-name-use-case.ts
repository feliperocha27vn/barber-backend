import { PrismaBarberShopRepository } from '@/repositories/prisma/prisma-barber-shop-repository'
import { GetAllBarberShopsUseCase } from '@/use-cases/barber-shop/fetch-barber-shops'

export function makeFetchBarberShopsByName() {
  const prismaBarberShopRepository = new PrismaBarberShopRepository()
  const fetchBarberShopByName = new GetAllBarberShopsUseCase(
    prismaBarberShopRepository
  )

  return fetchBarberShopByName
}
