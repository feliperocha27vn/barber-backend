import type { FastifyPluginAsync } from 'fastify'
import { register } from './barber-shop/register'
import { login } from './barber-shop/login'

export const barberShopRoutes: FastifyPluginAsync = async app => {
  app.register(register)
  app.register(login)
}
