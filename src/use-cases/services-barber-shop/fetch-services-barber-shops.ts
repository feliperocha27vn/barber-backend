import type { BarberShopRepository } from '@/repositories/barber-shop-repository'
import type { ServicesBarberShopRepository } from '@/repositories/services-barber-shop-repository'
import type { Services } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface FetchServicesBarberShopsUseCaseRequest {
  idBarberShop: string
}

interface FetchServicesBarberShopsUseCaseResponse {
  services: Services[] | null
}

export class FetchServicesBarberShopsUseCase {
  constructor(
    private servicesBarberShopRepository: ServicesBarberShopRepository,
    private barberShopRepository: BarberShopRepository
  ) {}

  async execute({
    idBarberShop,
  }: FetchServicesBarberShopsUseCaseRequest): Promise<FetchServicesBarberShopsUseCaseResponse> {
    const barberShop = await this.barberShopRepository.findById(idBarberShop)

    if (!barberShop) {
      throw new ResourceNotFoundError()
    }

    const services =
      await this.servicesBarberShopRepository.fetchMany(idBarberShop)

    return {
      services,
    }
  }
}
