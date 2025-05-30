import type { Prisma, BarberShop } from 'generated/prisma'

export interface BarberShopRepository {
  create(data: Prisma.BarberShopCreateInput): Promise<BarberShop>

  findByEmail(email: string): Promise<BarberShop | null>

  findById(id: string): Promise<BarberShop | null>

  findAllBarbersShops(
    data: Prisma.BarberShopFindManyArgs
  ): Promise<BarberShop | null>
}
