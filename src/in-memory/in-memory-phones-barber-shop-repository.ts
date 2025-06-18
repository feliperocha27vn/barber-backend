import type { PhonesBarberShopRepository } from '@/repositories/phones-barber-shop-repository'
import type { BarberShopPhones, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPhonesBarberShopRepository
  implements PhonesBarberShopRepository
{
  private phonesBarberShop: BarberShopPhones[] = []

  async create(data: Prisma.BarberShopPhonesUncheckedCreateInput) {
    const phoneBarberShop = {
      id: data.id ?? randomUUID(),
      numero: data.numero,
      tipo: data.tipo,
      barber_shop_id: data.barber_shop_id,
      createdAt: new Date(),
    }

    this.phonesBarberShop.push(phoneBarberShop)

    return phoneBarberShop
  }
}
