import type { ServicesBarberShopRepository } from '@/repositories/services-barber-shop-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import type { BarberShopRepository } from '@/repositories/barber-shop-repository'

interface DeleteServiceBarberShopUseCaseRequest {
  idBarberShop: string
  idService: string
}

export class DeleteServiceBarberShopUseCase {
  constructor(
    private servicesBarberShopRepository: ServicesBarberShopRepository,
    private barberShopRepository: BarberShopRepository
  ) {}

  async execute({
    idBarberShop,
    idService,
  }: DeleteServiceBarberShopUseCaseRequest) {
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

    await this.servicesBarberShopRepository.delete(idBarberShop, idService)
  }
}
