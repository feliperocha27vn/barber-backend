import type { BarberShopRepository } from '@/repositories/barber-shop-repository'
import type { Prisma, BarberShop } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryBarberShopRepository implements BarberShopRepository {
  private barberShops: BarberShop[] = []

  async findAllBarbersShops(query: string) {
    const barberShopsFilter = await this.barberShops.filter(item =>
      item.nome.includes(query)
    )

    return barberShopsFilter
  }

  async findById(id: string) {
    const barberShop = this.barberShops.find(barberShop => id === barberShop.id)

    if (!barberShop) {
      return null
    }

    return barberShop
  }

  async create(data: Prisma.BarberShopCreateInput) {
    const barberShop = {
      id: randomUUID(),
      nome: data.nome,
      email: data.email,
      senha_hash: data.senha_hash,
      area_atendimento: data.area_atendimento,
      CEP: data.CEP,
      cidade: data.cidade,
      estado: data.estado,
      bairro: data.bairro,
      logradouro: data.logradouro,
      numero: data.numero,
      complemento: data.complemento ?? null,
      createdAt: new Date(),
    }

    this.barberShops.push(barberShop)

    return barberShop
  }

  async findByEmail(email: string) {
    const barberShop = this.barberShops.find(
      barberShop => email === barberShop.email
    )

    if (!barberShop) {
      return null
    }

    return barberShop
  }
}
