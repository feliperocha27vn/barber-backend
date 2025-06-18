import type { BarberShopRepository } from '@/repositories/barber-shop-repository'
import type { PhonesBarberShopRepository } from '@/repositories/phones-barber-shop-repository'
import type { BarberShopPhones } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface CreatePhonesBarberShopUseCaseRequest {
  numero: string
  tipo: string
  barberShopId: string
}

interface CreatePhonesBarberShopUseCaseResponse {
  phoneBarberShop: BarberShopPhones
}

export class CreatePhoneBarberShopUseCase {
  constructor(
    private phonesBarberShopRepository: PhonesBarberShopRepository,
    private barberShopRepository: BarberShopRepository
  ) {}

  async execute({
    numero,
    tipo,
    barberShopId,
  }: CreatePhonesBarberShopUseCaseRequest): Promise<CreatePhonesBarberShopUseCaseResponse> {
    const barberShop = await this.barberShopRepository.findById(barberShopId)

    if (!barberShop) {
      throw new ResourceNotFoundError()
    }

    const phoneBarberShop = await this.phonesBarberShopRepository.create({
      numero,
      tipo,
      barber_shop_id: barberShopId,
    })

    return {
      phoneBarberShop,
    }
  }
}
