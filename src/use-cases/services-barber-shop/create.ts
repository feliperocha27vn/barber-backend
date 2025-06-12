import type { ServicesBarberShopRepository } from '@/repositories/services-barber-shop-repository'
import type { Services } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import type { BarberShopRepository } from '@/repositories/barber-shop-repository'

interface CreateServiceBarberShopUseCaseRequest {
  nome: string
  descricao: string | null
  preco: number
  barberShopId: string
}

interface CreateServiceBarberShopUseCaseResponse {
  service: Services
}

export class CreateServiceBarberShopUseCase {
  constructor(
    private servicesBarberShopRepository: ServicesBarberShopRepository,
    private barberShopRepository: BarberShopRepository
  ) {}

  async execute({
    nome,
    descricao,
    preco,
    barberShopId,
  }: CreateServiceBarberShopUseCaseRequest): Promise<CreateServiceBarberShopUseCaseResponse> {
    const barberShop = await this.barberShopRepository.findById(barberShopId)

    if (!barberShop) {
      throw new ResourceNotFoundError()
    }

    const service = await this.servicesBarberShopRepository.create({
      nome,
      descricao,
      preco,
      barber_shop_id: barberShopId,
    })

    return {
      service,
    }
  }
}
