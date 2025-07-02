import type { FastifyPluginAsync } from 'fastify'
import { register } from './register'
import { login } from './login'
import { getBarberShop } from './get-barber-shop'
import { fetchBarberShopsByName } from './fetch-barber-shops-by-name'

export const barberShopRoutes: FastifyPluginAsync = async app => {
  app.register(register)
  app.register(login)

  app.register(fetchBarberShopsByName)

  //authenticate
  app.register(getBarberShop)
}
