import type { Prisma, Services } from '@prisma/client'

export interface ServicesBarberShopRepository {
  create(data: Prisma.ServicesUncheckedCreateInput): Promise<Services>
  fetchMany(idBarberShop: string): Promise<Services[] | null>
  findById(idBarberShop: string, idService: string): Promise<Services | null>
}
