import type { FastifyPluginAsync } from 'fastify'
import { create } from './services-barber-shop/create'
import { fetchServicesBarberShop } from './services-barber-shop/fetch-services-barber-shops'
import { getServiceBarberShop } from './services-barber-shop/get-service'
import { update } from './services-barber-shop/update'
import { deleteRoute } from './services-barber-shop/delete'

export const servicesBarberShopRoutes: FastifyPluginAsync = async app => {
  //authenticate
  app.register(create)
  app.register(fetchServicesBarberShop)
  app.register(getServiceBarberShop)
  app.register(update)
  app.register(deleteRoute)
}
