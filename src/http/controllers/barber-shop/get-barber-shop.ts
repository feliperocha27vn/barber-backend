import { makeGetBarberShopUseCase } from '@/factories/barber-shop/make-get-barber-shop-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getBarberShop: FastifyPluginAsyncZod = async app => {
  app.post(
    '/barbearia/get-barber-shops',
    {
      schema: {
        tags: ['Barbearias'],
        body: z.object({
          barber_id: z.string().uuid(),
        }),
      },
    },
    async (request, response) => {
      const { barber_id } = request.body

      const getBarberShopUseCase = makeGetBarberShopUseCase()

      try {
        const barberShop = await getBarberShopUseCase.execute({
          barberShopId: barber_id,
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
