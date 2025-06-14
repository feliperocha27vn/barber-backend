import { makeFetchServiceBarberShopUseCase } from '@/factories/services-barber-shop/make-fetch-services-barber-shop'
import { makeGetServiceBarberShopUseCase } from '@/factories/services-barber-shop/make-get-service-barber-shop-use-case'
import { verifyJwt } from '@/middlewares/jwt-verify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getServiceBarberShop: FastifyPluginAsyncZod = async app => {
  app.get(
    '/servico/:idServiceBarberShop',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Serviços da Barbearia'],
        params: z.object({
          idServiceBarberShop: z.string().uuid(),
        }),
      },
    },
    async (request, response) => {
      const { idServiceBarberShop } = request.params

      const getServiceBarberShopUseCase = makeGetServiceBarberShopUseCase()

      try {
        const { service } = await getServiceBarberShopUseCase.execute({
          idBarberShop: request.user.sub,
          idService: idServiceBarberShop,
        })

        return response.status(201).send({ service })
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
