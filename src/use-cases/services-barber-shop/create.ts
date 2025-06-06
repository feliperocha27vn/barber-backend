import type { ServicesBarberShopRepository } from '@/repositories/services-barber-shop-repository'
import type { Services } from '@prisma/client'

interface CreateServiceBarberShopUseCaseRequest {
  nome: string
  descricao: string | null
  preco: number
  barberShopId: string
}

interface CreateServiceBarberShopUseCaseResponse {
  service: Services
}

export class CreateServiceBarberShopUseCase {
  constructor(
    private servicesBarberShopRepository: ServicesBarberShopRepository
  ) {}

  async execute({
    nome,
    descricao,
    preco,
    barberShopId,
  }: CreateServiceBarberShopUseCaseRequest): Promise<CreateServiceBarberShopUseCaseResponse> {
    const service = await this.servicesBarberShopRepository.create({
      nome,
      descricao,
      preco,
      barber_shop_id: barberShopId,
    })

    return {
      service,
    }
  }
}
