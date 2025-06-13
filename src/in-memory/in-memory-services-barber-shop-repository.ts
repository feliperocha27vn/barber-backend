import type { ServicesBarberShopRepository } from '@/repositories/services-barber-shop-repository'
import { Prisma, type Services } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryServicesBarberShopRepository
  implements ServicesBarberShopRepository
{
  private servicesBarberShop: Services[] = []

  async delete(idBarberShop: string, idService: string) {
    const serviceIndex = this.servicesBarberShop.findIndex(
      item => item.barber_shop_id === idBarberShop && item.id === idService
    )

    if (serviceIndex < 0) {
      return null
    }

    this.servicesBarberShop.splice(serviceIndex, 1)
  }

  async update(
    idBarberShop: string,
    idService: string,
    serviceData: Partial<Services>
  ) {
    // procuro o indice do serviço em questão
    const serviceIndex = this.servicesBarberShop.findIndex(
      item => idService === item.id && idBarberShop === item.barber_shop_id
    )

    // ao encontrar o indice, armazeno ele dentro de uma const
    const serviceExistes = this.servicesBarberShop[serviceIndex]

    if (serviceIndex < 0) {
      return null
    }

    // uso o spread operator para jogar os dados do serviço que já existe,
    // mais os dados que foram passados para atualizar
    const serviceUpdated = {
      ...serviceExistes,
      ...serviceData,
    }

    const service = serviceUpdated

    return service
  }

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
