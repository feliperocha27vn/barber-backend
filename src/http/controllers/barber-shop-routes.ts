import type { FastifyPluginAsync } from 'fastify'
import { register } from './barber-shop/register'
import { login } from './barber-shop/login'
import { getBarberShop } from './barber-shop/get-barber-shop'
import { fetchBarberShopsByName } from './barber-shop/fetch-barber-shops-by-name'

export const barberShopRoutes: FastifyPluginAsync = async app => {
  app.register(register)
  app.register(login)
  app.register(getBarberShop)
  app.register(fetchBarberShopsByName)
}
