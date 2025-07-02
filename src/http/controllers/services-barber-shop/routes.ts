import type { FastifyPluginAsync } from 'fastify'
import { create } from './create'
import { fetchServicesBarberShop } from './fetch-services-barber-shops'
import { getServiceBarberShop } from './get-service'
import { update } from './update'
import { deleteRoute } from './delete'
import { verifyJwt } from '@/middlewares/jwt-verify'

export const servicesBarberShopRoutes: FastifyPluginAsync = async app => {
  app.addHook('onRequest', verifyJwt)
  app.register(create)
  app.register(fetchServicesBarberShop)
  app.register(getServiceBarberShop)
  app.register(update)
  app.register(deleteRoute)
}
