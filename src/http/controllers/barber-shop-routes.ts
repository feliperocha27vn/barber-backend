import type { FastifyPluginAsync } from 'fastify'
import { register } from './barber-shop/register'

export const barberShopRoutes: FastifyPluginAsync = async app => {
  app.register(register)
}
