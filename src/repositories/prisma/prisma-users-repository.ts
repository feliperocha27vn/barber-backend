import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import type { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UsersCreateInput) {
    const user = await prisma.users.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
