import type { Prisma } from 'generated/prisma'
import type { BarberShopRepository } from '../barber-shop-repository'
import { prisma } from '@/lib/prisma'

export class PrismaBarberShopRepository implements BarberShopRepository {
  async create(data: Prisma.BarberShopCreateInput) {
    const barberShop = await prisma.barberShop.create({
      data,
    })

    return barberShop
  }
}
