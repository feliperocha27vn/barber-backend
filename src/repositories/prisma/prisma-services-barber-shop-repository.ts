import type { Prisma, Services } from '@prisma/client'
import type { BarberShopRepository } from '../barber-shop-repository'
import { prisma } from '@/lib/prisma'
import type { ServicesBarberShopRepository } from '../services-barber-shop-repository'

export class PrismaServicesBarberShopRepository
  implements ServicesBarberShopRepository
{
  async create(data: Prisma.ServicesUncheckedCreateInput): Promise<Services> {
    const serviceBarberShop = await prisma.services.create({
      data,
    })

    return serviceBarberShop
  }

  async fetchMany(idBarberShop: string): Promise<Services[] | null> {
    const servicesBarberShop = await prisma.services.findMany({
      where: {
        barber_shop_id: idBarberShop,
      },
    })

    return servicesBarberShop
  }

  async findById(
    idBarberShop: string,
    idService: string
  ): Promise<Services | null> {
    const serviceBarberShopById = await prisma.services.findUnique({
      where: {
        id: idService,
        barber_shop_id: idBarberShop,
      },
    })

    return serviceBarberShopById
  }
}
