import type { ServicesBarberShopRepository } from '@/repositories/services-barber-shop-repository'
import { Prisma, type Services } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryServicesBarberShopRepository
  implements ServicesBarberShopRepository
{
  private sercicesBarberShop: Services[] = []

  async fetchMany() {
    return this.sercicesBarberShop
  }

  async create(data: Prisma.ServicesUncheckedCreateInput) {
    const servicesBarberShop = {
      id: data.id ?? randomUUID(),
      nome: data.nome,
      descricao: data.descricao ?? null,
      preco: new Prisma.Decimal(data.preco.toString()),
      barber_shop_id: data.barber_shop_id,
      createdAt: new Date(),
    }

    this.sercicesBarberShop.push(servicesBarberShop)

    return servicesBarberShop
  }
}
