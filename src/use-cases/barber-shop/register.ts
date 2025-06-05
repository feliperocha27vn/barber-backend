import type { BarberShopRepository } from '@/repositories/barber-shop-repository'
import { hash } from 'bcryptjs'
import type { BarberShop } from '@prisma/client'
import { BarberAlreadyExists } from '../errors/barber-already-exists-error'
import { InvalidParameters } from '../errors/invalid-parameters-error'

interface RegisterUseCaseRequest {
  nome: string
  email: string
  senha: string
  area_atendimento: string
  CEP: string
  estado: string
  cidade: string
  bairro: string
  logradouro: string
  numero: string
  complemento?: string | null
}

interface RegisterUseCaseResponse {
  barberShop: BarberShop
}

export class RegisterUseCase {
  constructor(private barberShopeRepository: BarberShopRepository) {}

  async execute({
    nome,
    email,
    senha,
    area_atendimento,
    CEP,
    estado,
    cidade,
    bairro,
    logradouro,
    numero,
    complemento,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const senha_hash = await hash(senha, 6)

    const cleanCep = CEP.replace('-', '')
    const isValidCep = /^\d{8}$/.test(cleanCep)

    if (!isValidCep) {
      throw new InvalidParameters()
    }

    const userAlreadyExists =
      await this.barberShopeRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new BarberAlreadyExists()
    }

    const barberShop = await this.barberShopeRepository.create({
      nome,
      email,
      senha_hash,
      area_atendimento,
      CEP,
      estado,
      cidade,
      bairro,
      logradouro,
      numero,
      complemento,
    })

    return { barberShop }
  }
}
