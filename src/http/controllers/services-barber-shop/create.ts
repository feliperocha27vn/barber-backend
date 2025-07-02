import { makeCreateServiceBarberShopUseCase } from '@/factories/services-barber-shop/make-create-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const create: FastifyPluginAsyncZod = async app => {
  app.post(
    '/servicos',
    {
      schema: {
        tags: ['Serviços da Barbearia'],
        body: z.object({
          nome: z.string(),
          descricao: z.string().nullable(),
          preco: z.coerce.number(),
        }),
      },
    },
    async (request, response) => {
      const { nome, descricao, preco } = request.body

      const createServiceBarberShopUseCase =
        makeCreateServiceBarberShopUseCase()

      try {
        const { service } = await createServiceBarberShopUseCase.execute({
          nome,
          descricao,
          preco,
          barberShopId: request.user.sub,
        })

        return response.status(201).send({
          service,
        })
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
