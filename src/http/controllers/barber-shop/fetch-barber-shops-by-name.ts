import { makeFetchBarberShopsByName } from '@/factories/barber-shop/make-fetch-barber-shops-by-name-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const fetchBarberShopsByName: FastifyPluginAsyncZod = async app => {
  app.get(
    '/barbearia/fetch-barber-shops',
    {
      schema: {
        tags: ['Barbearias'],
      },
    },
    async (__, response) => {
      const fetchBarberShops = makeFetchBarberShopsByName()

      try {
        const { barberShops } = await fetchBarberShops.execute()

        const barberShopsNoSensiveData = barberShops.map(barberShop => ({
          ...barberShop,
          email: undefined,
          senha_hash: undefined,
        }))

        return response.status(200).send(barberShopsNoSensiveData)
      } catch (error) {
        if (error instanceof ResourceNotFoundError) {
          return response.status(409).send({
            message: error.message,
          })
        }
      }
    }
  )
}
