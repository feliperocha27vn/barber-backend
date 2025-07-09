import { PrismaBarberShopPhonesRepository } from '@/repositories/prisma/prisma-barber-shop-phones-repository'
import { PrismaBarberShopRepository } from '@/repositories/prisma/prisma-barber-shop-repository'
import { DeletePhoneBarberShopUseCase } from '@/use-cases/phones-barber-shop/delete'

export function makeDeletePhoneBarberShopUseCase() {
  const prismaBarberShopRepository = new PrismaBarberShopRepository()
  const prismaPhoneBarberShopRepository = new PrismaBarberShopPhonesRepository()
  const deletePhoneBarberShopUseCase = new DeletePhoneBarberShopUseCase(
    prismaPhoneBarberShopRepository,
    prismaBarberShopRepository
  )

  return deletePhoneBarberShopUseCase
}
