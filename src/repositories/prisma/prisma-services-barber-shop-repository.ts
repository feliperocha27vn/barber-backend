import type { Prisma, Services } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type { ServicesBarberShopRepository } from '../services-barber-shop-repository'

export class PrismaServicesBarberShopRepository
  implements ServicesBarberShopRepository
{
  async create(data: Prisma.ServicesUncheckedCreateInput) {
    const serviceBarberShop = await prisma.services.create({
      data,
    })

    return serviceBarberShop
  }

  async fetchMany(idBarberShop: string) {
    const servicesBarberShop = await prisma.services.findMany({
      where: {
        barber_shop_id: idBarberShop,
      },
    })

    return servicesBarberShop
  }

  async findById(idBarberShop: string, idService: string) {
    const serviceBarberShopById = await prisma.services.findUnique({
      where: {
        id: idService,
        barber_shop_id: idBarberShop,
      },
    })

    return serviceBarberShopById
  }

  async update(
    idBarberShop: string,
    idService: string,
    service: Partial<Services>
  ) {
    const serviceBarberShopUpdated = await prisma.services.update({
      where: {
        id: idService,
        barber_shop_id: idBarberShop,
      },
      data: service,
    })

    return serviceBarberShopUpdated
  }

  async delete(idBarberShop: string, idService: string) {
    await prisma.services.delete({
      where: {
        id: idService,
        barber_shop_id: idBarberShop,
      },
    })
  }
}
