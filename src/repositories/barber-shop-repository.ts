import type { Prisma, BarberShop } from 'generated/prisma'

export interface BarberShopRepository {
  create(data: Prisma.BarberShopCreateInput): Promise<BarberShop>

  findByEmail(email: string): Promise<BarberShop | null>
}
