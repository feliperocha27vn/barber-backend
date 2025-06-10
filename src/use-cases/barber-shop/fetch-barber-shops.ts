import type { BarberShopRepository } from '@/repositories/barber-shop-repository'
import type { BarberShop } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetAllBarberShopsResponse {
  barberShops: BarberShop[]
}

export class GetAllBarberShopsUseCase {
  constructor(private barberShopsRepository: BarberShopRepository) {}

  async execute(): Promise<GetAllBarberShopsResponse> {
    const barberShops = await this.barberShopsRepository.fetchBarberShops()

    if (barberShops.length === 0) {
      throw new ResourceNotFoundError()
    }

    return {
      barberShops,
    }
  }
}
