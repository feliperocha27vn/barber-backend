import type { FastifyPluginAsync } from 'fastify'
import { create } from './services-barber-shop/create'

export const servicesBarberShopRoutes: FastifyPluginAsync = async app => {
  app.register(create)
}
