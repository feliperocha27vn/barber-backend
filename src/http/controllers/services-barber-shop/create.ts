import { makeCreateServiceBarberShopUseCase } from '@/factories/services-barber-shop/make-create-use-case'
import { verifyJwt } from '@/middlewares/jwt-verify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const create: FastifyPluginAsyncZod = async app => {
  app.post(
    '/servicos',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Serviços da Barbearia'],
        body: z.object({
          nome: z.string(),
          descricao: z.string(),
          preco: z.coerce.number(),
        }),
      },
    },
    async (request, response) => {
      const { nome, descricao, preco } = request.body

      const createServiceBarberShopUseCase =
        makeCreateServiceBarberShopUseCase()

      try {
        await createServiceBarberShopUseCase.execute({
          nome,
          descricao,
          preco,
          barberShopId: request.user.sub,
        })
      } catch (error) {
        if (error instanceof ResourceNotFoundError) {
          return response.status(409).send({
            message: error.message,
          })
        }
      }

      return response.status(201).send()
    }
  )
}
