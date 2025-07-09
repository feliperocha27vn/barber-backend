import type { BarberShopPhones, Prisma } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import type { BarberShopRepository } from '@/repositories/barber-shop-repository'
import type { PhonesBarberShopRepository } from '@/repositories/phones-barber-shop-repository'

interface UpdatePhoneBarberShopUseCaseRequest {
  idBarberShop: string
  idBarberShopPhone: string
  data: Partial<BarberShopPhones>
}

interface UpdatePhoneBarberShopUseCaseResponse {
  phone: BarberShopPhones
}

export class UpdatePhoneBarberShopUseCase {
  constructor(
    private phonesBarberShopRepository: PhonesBarberShopRepository,
    private barberShopRepository: BarberShopRepository
  ) {}

  async execute({
    idBarberShop,
    idBarberShopPhone,
    data,
  }: UpdatePhoneBarberShopUseCaseRequest): Promise<UpdatePhoneBarberShopUseCaseResponse> {
    const barberShop = await this.barberShopRepository.findById(idBarberShop)

    if (!barberShop) {
      throw new ResourceNotFoundError()
    }

    const phone = await this.phonesBarberShopRepository.findById(
      idBarberShop,
      idBarberShopPhone
    )

    if (!phone) {
      throw new ResourceNotFoundError()
    }

    const phoneBarberShopUpdated = await this.phonesBarberShopRepository.update(
      idBarberShop,
      idBarberShopPhone,
      data
    )

    if (!phoneBarberShopUpdated) {
      throw new ResourceNotFoundError()
    }

    return {
      phone: phoneBarberShopUpdated,
    }
  }
}
