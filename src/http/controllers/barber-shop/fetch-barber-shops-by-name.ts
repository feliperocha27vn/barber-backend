import { makeFetchBarberShopsByName } from '@/factories/barber-shop/make-fetch-barber-shops-by-name-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const fetchBarberShopsByName: FastifyPluginAsyncZod = async app => {
  app.post(
    '/barbearias/fetch-barber-shops',
    {
      schema: {
        body: z.object({
          query: z.string(),
        }),
      },
    },
    async (request, response) => {
      const { query } = request.body

      const fetchBarberShopsByName = makeFetchBarberShopsByName()

      try {
        const barberShop = await fetchBarberShopsByName.execute({
          query,
        })

        return response.status(200).send(barberShop)
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
