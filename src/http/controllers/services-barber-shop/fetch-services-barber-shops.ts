import { makeFetchServiceBarberShopUseCase } from '@/factories/services-barber-shop/make-fetch-services-barber-shop'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const fetchServicesBarberShop: FastifyPluginAsyncZod = async app => {
  app.get(
    '/servicos/:barberShopId',
    {
      schema: {
        tags: ['Serviços da Barbearia'],
        params: z.object({
          barberShopId: z.uuid(),
        }),
      },
    },
    async (request, response) => {
      const { barberShopId } = request.params

      const fetchServiceBarberShopUseCase = makeFetchServiceBarberShopUseCase()

      try {
        const { services } = await fetchServiceBarberShopUseCase.execute({
          idBarberShop: barberShopId,
        })

        return response.status(200).send({ services })
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
