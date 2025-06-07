import type { ServicesBarberShopRepository } from '@/repositories/services-barber-shop-repository'
import type { Services } from '@prisma/client'

interface FetchServicesBarberShopsUseCaseResponse {
  services: Services[]
}

export class FetchServicesBarberShopsUseCase {
  constructor(
    private servicesBarberShopRepository: ServicesBarberShopRepository
  ) {}

  async execute(): Promise<FetchServicesBarberShopsUseCaseResponse> {
    const services = await this.servicesBarberShopRepository.fetchMany()

    return {
      services,
    }
  }
}
