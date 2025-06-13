import type { Prisma, Services } from '@prisma/client'

export interface ServicesBarberShopRepository {
  create(data: Prisma.ServicesUncheckedCreateInput): Promise<Services>
  fetchMany(idBarberShop: string): Promise<Services[] | null>
  findById(idBarberShop: string, idService: string): Promise<Services | null>
  update(
    idBarberShop: string,
    idService: string,
    service: Partial<Prisma.ServicesUncheckedUpdateInput>
  ): Promise<Services | null>
  delete(idBarberShop: string, idService: string): void
}
