import type { BarberShopRepository } from '@/repositories/barber-shop-repository'
import type { PhonesBarberShopRepository } from '@/repositories/phones-barber-shop-repository'
import type { BarberShopPhones } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface FetchPhonesBarberShopUseCaseRequest {
  barberShopId: string
}

interface FetchPhonesBarberShopUseCaseResponse {
  phoneBarberShop: BarberShopPhones[]
}

export class FetchPhoneBarberShopUseCase {
  constructor(
    private phonesBarberShopRepository: PhonesBarberShopRepository,
    private barberShopRepository: BarberShopRepository
  ) {}

  async execute({
    barberShopId,
  }: FetchPhonesBarberShopUseCaseRequest): Promise<FetchPhonesBarberShopUseCaseResponse> {
    const barberShop = await this.barberShopRepository.findById(barberShopId)

    if (!barberShop) {
      throw new ResourceNotFoundError()
    }

    const phoneBarberShop =
      await this.phonesBarberShopRepository.fetchMany(barberShopId)

    if (!phoneBarberShop) {
      throw new ResourceNotFoundError()
    }

    return {
      phoneBarberShop,
    }
  }
}
