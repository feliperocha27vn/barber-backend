import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import type { BarberShopRepository } from '@/repositories/barber-shop-repository'
import type { PhonesBarberShopRepository } from '@/repositories/phones-barber-shop-repository'

interface DeletePhoneBarberShopUseCaseRequest {
  idBarberShop: string
  idBarberShopPhone: string
}

export class DeletePhoneBarberShopUseCase {
  constructor(
    private phoneBarberShopRepository: PhonesBarberShopRepository,
    private barberShopRepository: BarberShopRepository
  ) {}

  async execute({
    idBarberShop,
    idBarberShopPhone,
  }: DeletePhoneBarberShopUseCaseRequest) {
    const barberShop = await this.barberShopRepository.findById(idBarberShop)

    if (!barberShop) {
      throw new ResourceNotFoundError()
    }

    const phoneById = await this.phoneBarberShopRepository.findById(
      idBarberShop,
      idBarberShopPhone
    )

    if (!phoneById) {
      throw new ResourceNotFoundError()
    }

    this.phoneBarberShopRepository.delete(idBarberShop, idBarberShopPhone)
  }
}
