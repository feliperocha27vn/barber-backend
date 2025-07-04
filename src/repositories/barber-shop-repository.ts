import type { Prisma, BarberShop } from '@prisma/client'

export interface BarberShopRepository {
  create(data: Prisma.BarberShopCreateInput): Promise<BarberShop>
  findByEmail(email: string): Promise<BarberShop | null>
  findById(id: string): Promise<BarberShop | null>
  fetchBarberShops(): Promise<BarberShop[]>
}
