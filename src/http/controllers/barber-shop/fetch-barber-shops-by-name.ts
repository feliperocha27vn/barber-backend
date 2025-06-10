import { makeFetchBarberShopsByName } from '@/factories/barber-shop/make-fetch-barber-shops-by-name-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const fetchBarberShopsByName: FastifyPluginAsyncZod = async app => {
  app.get('/barbearias/fetch-barber-shops', async (request, response) => {
    const fetchBarberShops = makeFetchBarberShopsByName()

    try {
      const barberShop = await fetchBarberShops.execute()

      return response.status(200).send(barberShop)
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return response.status(409).send({
          message: error.message,
        })
      }
    }
  })
}
