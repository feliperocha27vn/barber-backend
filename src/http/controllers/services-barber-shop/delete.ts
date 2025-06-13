import { makeDeleteServiceBarberShopUseCase } from '@/factories/services-barber-shop/make-delete-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/servicos',
    {
      schema: {
        tags: ['Serviços da Barbearia'],
        body: z.object({
          idBarberShop: z.string().uuid(),
          idService: z.string().uuid(),
        }),
      },
    },
    async (request, response) => {
      const { idBarberShop, idService } = request.body

      const updateServiceBarberShopUseCase =
        makeDeleteServiceBarberShopUseCase()

      try {
        await updateServiceBarberShopUseCase.execute({
          idBarberShop,
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
