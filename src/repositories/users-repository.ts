import type { Prisma, Users } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UsersCreateInput): Promise<Users>
  findByEmail(email: string): Promise<Users | null>
}
