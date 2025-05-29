import type { BarberShopRepository } from '@/repositories/barber-shop-repository'
import type { BarberShop } from 'generated/prisma'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetBarberShopUseCaseRequest {
  barberShopId: string
}

interface GetBarberShopUseCaseResponse {
  barberShop: BarberShop
}

export class GetBarberShopUseCase {
  constructor(private barberShopRepository: BarberShopRepository) {}

  async execute({
    barberShopId,
  }: GetBarberShopUseCaseRequest): Promise<GetBarberShopUseCaseResponse> {
    const barberShop = await this.barberShopRepository.findById(barberShopId)

    if (!barberShop) {
      throw new ResourceNotFoundError()
    }

    return {
      barberShop,
    }
  }
}
