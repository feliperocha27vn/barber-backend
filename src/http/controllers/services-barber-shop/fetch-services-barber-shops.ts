import { makeFetchServiceBarberShopUseCase } from '@/factories/services-barber-shop/make-fetch-services-barber-shop'
import { verifyJwt } from '@/middlewares/jwt-verify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const fetchServicesBarberShop: FastifyPluginAsyncZod = async app => {
  app.get(
    '/servicos',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Serviços da Barbearia'],
      },
    },
    async (request, response) => {
      const fetchServiceBarberShopUseCase = makeFetchServiceBarberShopUseCase()

      try {
        const { services } = await fetchServiceBarberShopUseCase.execute({
          idBarberShop: request.user.sub,
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
