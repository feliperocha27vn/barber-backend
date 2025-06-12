import type { FastifyPluginAsync } from 'fastify'
import { create } from './services-barber-shop/create'
import { fetchServicesBarberShop } from './services-barber-shop/fetch-services-barber-shops'

export const servicesBarberShopRoutes: FastifyPluginAsync = async app => {
  app.register(create)
  app.register(fetchServicesBarberShop)
}
