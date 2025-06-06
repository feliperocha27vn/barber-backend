import type { Prisma, Services } from '@prisma/client'

export interface ServicesBarberShopRepository {
  create(data: Prisma.ServicesCreateInput): Promise<Services>
}
