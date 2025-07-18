import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import type { BarberShopRepository } from '../barber-shop-repository'

export class PrismaBarberShopRepository implements BarberShopRepository {
  async create(data: Prisma.BarberShopCreateInput) {
    const barberShop = await prisma.barberShop.create({
      data,
    })

    return barberShop
  }

  async findByEmail(email: string) {
    const barberShop = await prisma.barberShop.findUnique({
      where: {
        email,
      },
    })

    return barberShop
  }

  async findById(id: string) {
    const barberShop = await prisma.barberShop.findUnique({
      where: {
        id,
      },
    })

    return barberShop
  }

  fetchBarberShops() {
    const barberShops = prisma.barberShop.findMany()

    return barberShops
  }
}
