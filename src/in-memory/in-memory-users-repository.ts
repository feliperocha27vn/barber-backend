import type { UsersRepository } from '@/repositories/users-repository'
import type { Prisma, Users } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  private users: Users[] = []

  async create(data: Prisma.UsersCreateInput) {
    const user = {
      id: data.id ?? randomUUID(),
      nome: data.nome,
      email: data.email,
      senha_hash: data.senha_hash,
      emailVerified: data.emailVerified ?? null,
      urlImage: data.urlImage ?? null,
      createdAt: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<Users | null> {
    const user = this.users.find(user => user.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
