import type { BarberShopRepository } from '@/repositories/barber-shop-repository'
import type { BarberShop } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetAllBarbersRequest {
  query: string
}

interface GetAllBarberShopsResponse {
  barberShops: BarberShop[]
}

export class GetAllBarberShopsUseCase {
  constructor(private barberShopsRepository: BarberShopRepository) {}

  async execute({
    query,
  }: GetAllBarbersRequest): Promise<GetAllBarberShopsResponse> {
    const barberShops =
      await this.barberShopsRepository.findAllBarbersShops(query)

    if (barberShops.length === 0) {
      throw new ResourceNotFoundError()
    }

    return {
      barberShops,
    }
  }
}
