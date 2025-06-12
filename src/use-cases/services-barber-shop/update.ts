import type { ServicesBarberShopRepository } from '@/repositories/services-barber-shop-repository'
import type { Services } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import type { BarberShopRepository } from '@/repositories/barber-shop-repository'

interface UpdateServiceBarberShopUseCaseRequest {
  idBarberShop: string
  idService: string
  data: Partial<Services>
}

interface UpdateServiceBarberShopUseCaseResponse {
  service: Services
}

export class UpdateServiceBarberShopUseCase {
  constructor(
    private servicesBarberShopRepository: ServicesBarberShopRepository,
    private barberShopRepository: BarberShopRepository
  ) {}

  async execute({
    idBarberShop,
    idService,
    data,
  }: UpdateServiceBarberShopUseCaseRequest): Promise<UpdateServiceBarberShopUseCaseResponse> {
    const barberShop = await this.barberShopRepository.findById(idBarberShop)

    if (!barberShop) {
      throw new ResourceNotFoundError()
    }

    const serviceById = await this.servicesBarberShopRepository.findById(
      idBarberShop,
      idService
    )

    if (!serviceById) {
      throw new ResourceNotFoundError()
    }

    const service = await this.servicesBarberShopRepository.update(
      idBarberShop,
      idService,
      data
    )

    if (!service) {
      throw new ResourceNotFoundError()
    }

    return {
      service,
    }
  }
}
