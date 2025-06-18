import type { BarberShopPhones, Prisma } from '@prisma/client'

export interface PhonesBarberShopRepository {
  create(
    data: Prisma.BarberShopPhonesUncheckedCreateInput
  ): Promise<BarberShopPhones>
}
