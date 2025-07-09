import type { BarberShopPhones, Prisma } from '@prisma/client'
import type { PhonesBarberShopRepository } from '../phones-barber-shop-repository'
import { prisma } from '@/lib/prisma'

export class PrismaBarberShopPhonesRepository
  implements PhonesBarberShopRepository
{
  async create(data: Prisma.BarberShopPhonesUncheckedCreateInput) {
    const barberShopPhone = await prisma.barberShopPhones.create({
      data,
    })

    return barberShopPhone
  }

  async findById(idBarberShop: string, idBarberShopPhone: string) {
    const barberShopById = await prisma.barberShopPhones.findUnique({
      where: {
        id: idBarberShopPhone,
        barber_shop_id: idBarberShop,
      },
    })

    return barberShopById
  }

  async fetchMany(idBarberShop: string) {
    const barberShopPhones = await prisma.barberShopPhones.findMany({
      where: {
        barber_shop_id: idBarberShop,
      },
    })

    return barberShopPhones
  }

  async delete(idBarberShop: string, idBarberShopPhone: string) {
    await prisma.barberShopPhones.delete({
      where: {
        id: idBarberShopPhone,
        barber_shop_id: idBarberShop,
      },
    })
  }

  async update(
    idBarberShop: string,
    idBarberShopPhone: string,
    data: Partial<BarberShopPhones>
  ) {
    const barberShopPhoneUpdated = await prisma.barberShopPhones.update({
      where: {
        id: idBarberShopPhone,
        barber_shop_id: idBarberShop,
      },
      data,
    })

    return barberShopPhoneUpdated
  }
}
