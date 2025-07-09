import type { PhonesBarberShopRepository } from '@/repositories/phones-barber-shop-repository'
import type { BarberShopPhones, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPhonesBarberShopRepository
  implements PhonesBarberShopRepository
{
  private phonesBarberShop: BarberShopPhones[] = []

  async fetchMany(idBarberShop: string) {
    const phoneBarberShop = this.phonesBarberShop.filter(
      item => item.barber_shop_id === idBarberShop
    )

    if (!phoneBarberShop) {
      return null
    }

    return phoneBarberShop
  }

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

  async delete(idBarberShop: string, idBarberShopPhone: string) {
    const phoneIndex = this.phonesBarberShop.findIndex(
      item =>
        item.id === idBarberShopPhone && item.barber_shop_id === idBarberShop
    )

    this.phonesBarberShop.splice(phoneIndex, 1)
  }

  async findById(idBarberShop: string, idBarberShopPhone: string) {
    const phone = this.phonesBarberShop.find(
      item =>
        item.barber_shop_id === idBarberShop && item.id === idBarberShopPhone
    )

    if (!phone) {
      return null
    }

    return phone
  }
}
