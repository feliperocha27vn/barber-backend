import type { FastifyPluginAsync } from 'fastify'
import { create } from './create'
import { deleteRoute } from './delete'
import { fetchServicesBarberShop } from './fetch-services-barber-shops'
import { getServiceBarberShop } from './get-service'
import { update } from './update'

export const servicesBarberShopRoutes: FastifyPluginAsync = async app => {
  // app.addHook('onRequest', verifyJwt)
  app.register(create)
  app.register(fetchServicesBarberShop)
  app.register(getServiceBarberShop)
  app.register(update)
  app.register(deleteRoute)
}
