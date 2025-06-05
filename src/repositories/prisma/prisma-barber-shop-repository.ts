import type { Prisma } from '@prisma/client'
import type { BarberShopRepository } from '../barber-shop-repository'
import { prisma } from '@/lib/prisma'

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

  findById(id: string) {
    const barberShop = prisma.barberShop.findUnique({
      where: {
        id,
      },
    })

    return barberShop
  }

  findAllBarbersShops(query: string) {
    const barberShops = prisma.barberShop.findMany({
      where: {
        nome: {
          contains: query,
          mode: 'insensitive',
        },
      },
    })

    return barberShops
  }
}
