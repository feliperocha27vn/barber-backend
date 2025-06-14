import { makeDeleteServiceBarberShopUseCase } from '@/factories/services-barber-shop/make-delete-use-case'
import { verifyJwt } from '@/middlewares/jwt-verify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/servico/:idService',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Serviços da Barbearia'],
        params: z.object({
          idService: z.string().uuid(),
        }),
      },
    },
    async (request, response) => {
      const { idService } = request.params

      const updateServiceBarberShopUseCase =
        makeDeleteServiceBarberShopUseCase()

      try {
        await updateServiceBarberShopUseCase.execute({
          idBarberShop: request.user.sub,
          idService,
        })
      } catch (error) {
        if (error instanceof ResourceNotFoundError) {
          return response.status(409).send({
            message: error.message,
          })
        }
      }

      return response.status(200).send()
    }
  )
}
