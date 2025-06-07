import type { Prisma, Services } from '@prisma/client'

export interface ServicesBarberShopRepository {
  create(data: Prisma.ServicesUncheckedCreateInput): Promise<Services>
  fetchMany(): Promise<Services[]>
}
