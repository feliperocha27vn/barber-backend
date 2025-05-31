import type { BarberShopRepository } from '@/repositories/barber-shop-repository'
import type { BarberShop } from 'generated/prisma'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticationUseCaseRequest {
  email: string
  senha: string
}

interface AuthenticationUseResponse {
  barberShop: BarberShop
}

export class AuthenticationUseCase {
  constructor(private barberShopRepository: BarberShopRepository) {}

  async execute({
    email,
    senha,
  }: AuthenticationUseCaseRequest): Promise<AuthenticationUseResponse> {
    const barberShop = await this.barberShopRepository.findByEmail(email)

    if (!barberShop) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(senha, barberShop.senha_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      barberShop,
    }
  }
}
