import { PrismaBarberShopPhonesRepository } from '@/repositories/prisma/prisma-barber-shop-phones-repository'
import { PrismaBarberShopRepository } from '@/repositories/prisma/prisma-barber-shop-repository'
import { DeletePhoneBarberShopUseCase } from '@/use-cases/phones-barber-shop/delete'
import { UpdatePhoneBarberShopUseCase } from '@/use-cases/phones-barber-shop/update'

export function makeUpdatePhoneBarberShopUseCase() {
  const prismaBarberShopRepository = new PrismaBarberShopRepository()
  const prismaPhoneBarberShopRepository = new PrismaBarberShopPhonesRepository()
  const updatePhoneBarberShopUseCase = new UpdatePhoneBarberShopUseCase(
    prismaPhoneBarberShopRepository,
    prismaBarberShopRepository
  )

  return updatePhoneBarberShopUseCase
}
