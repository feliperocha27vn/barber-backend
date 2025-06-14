import { makeUpdateServiceBarberShopUseCase } from '@/factories/services-barber-shop/make-update-use-case'
import { verifyJwt } from '@/middlewares/jwt-verify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const update: FastifyPluginAsyncZod = async app => {
  app.put(
    '/servico',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Serviços da Barbearia'],
        body: z.object({
          nome: z.string().optional(),
          descricao: z.string().optional(),
          preco: z.coerce.number().optional(),
          idService: z.string().uuid(),
        }),
      },
    },
    async (request, response) => {
      const { nome, descricao, preco, idService } = request.body

      const updateServiceBarberShopUseCase =
        makeUpdateServiceBarberShopUseCase()

      try {
        await updateServiceBarberShopUseCase.execute({
          idBarberShop: request.user.sub,
          idService,
          data: {
            nome,
            descricao,
            preco,
          },
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
