import type { BarberShopPhones, Prisma } from '@prisma/client'

export interface PhonesBarberShopRepository {
  create(
    data: Prisma.BarberShopPhonesUncheckedCreateInput
  ): Promise<BarberShopPhones>
  fetchMany(idBarberShop: string): Promise<BarberShopPhones[] | null>
  delete(idBarberShop: string, idBarberShopPhone: string): void
  findById(
    idBarberShop: string,
    idBarberShopPhone: string
  ): Promise<BarberShopPhones | null>
  update(
    idBarberShop: string,
    idBarberShopPhone: string,
    data: Partial<Prisma.BarberShopPhonesUncheckedUpdateInput>
  ): Promise<BarberShopPhones | null>
}
