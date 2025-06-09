import type { ServicesBarberShopRepository } from '@/repositories/services-barber-shop-repository'
import { Prisma, type Services } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryServicesBarberShopRepository
  implements ServicesBarberShopRepository
{
  private servicesBarberShop: Services[] = []

  async findById(idBarberShop: string, idService: string) {
    const service = this.servicesBarberShop.find(
      item => idService === item.id && idBarberShop === item.barber_shop_id
    )

    if (!service) {
      return null
    }

    return service
  }

  async fetchMany(idBarberShop: string) {
    const barberShopServices = this.servicesBarberShop.filter(
      item => item.barber_shop_id === idBarberShop
    )

    if (!barberShopServices) {
      return null
    }

    return barberShopServices
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

    this.servicesBarberShop.push(servicesBarberShop)

    return servicesBarberShop
  }
}
