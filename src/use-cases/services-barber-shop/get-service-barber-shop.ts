import type { ServicesBarberShopRepository } from '@/repositories/services-barber-shop-repository'
import type { Services } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import type { BarberShopRepository } from '@/repositories/barber-shop-repository'

interface GetServiceBarberShopUseCaseRequest {
  idBarberShop: string
  idService: string
}

interface GetServiceBarberShopUseCaseResponse {
  service: Services
}

export class GetServiceBarberShopUseCase {
  constructor(
    private servicesBarberShopRepository: ServicesBarberShopRepository,
    private barberShopRepository: BarberShopRepository
  ) {}

  async execute({
    idBarberShop,
    idService,
  }: GetServiceBarberShopUseCaseRequest): Promise<GetServiceBarberShopUseCaseResponse> {
    const barberShop = await this.barberShopRepository.findById(idBarberShop)

    if (!barberShop) {
      throw new ResourceNotFoundError()
    }

    const service = await this.servicesBarberShopRepository.findById(
      idBarberShop,
      idService
    )

    if (!service) {
      throw new ResourceNotFoundError()
    }

    return {
      service,
    }
  }
}
