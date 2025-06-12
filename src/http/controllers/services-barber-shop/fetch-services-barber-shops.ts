import { makeFetchServiceBarberShopUseCase } from '@/factories/services-barber-shop/make-fetch-services-barber-shop'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const fetchServicesBarberShop: FastifyPluginAsyncZod = async app => {
  app.get(
    '/barbearias/servicos/:idBarberShop',
    {
      schema: {
        tags: ['Serviços da Barbearia'],
        params: z.object({
          idBarberShop: z.string().uuid(),
        }),
      },
    },
    async (request, response) => {
      const { idBarberShop } = request.params

      const fetchServiceBarberShopUseCase = makeFetchServiceBarberShopUseCase()

      try {
        const { services } = await fetchServiceBarberShopUseCase.execute({
          idBarberShop,
        })

        return response.status(201).send({ services })
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
