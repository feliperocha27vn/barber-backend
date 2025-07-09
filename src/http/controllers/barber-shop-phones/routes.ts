import type { FastifyPluginAsync } from 'fastify'
import { verifyJwt } from '@/middlewares/jwt-verify'
import { create } from './create'
import { fetchPhonesBarberShop } from './fetch'
import { deletePhone } from './delete'
import { update } from './update'

export const phoneBarberShopRoutes: FastifyPluginAsync = async app => {
  app.addHook('onRequest', verifyJwt)
  app.register(create)
  app.register(fetchPhonesBarberShop)
  app.register(deletePhone)
  app.register(update)
}
