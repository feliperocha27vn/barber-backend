import { makeUpdatePhoneBarberShopUseCase } from '@/factories/barber-shop-phones/make-update-use-case'
import { verifyJwt } from '@/middlewares/jwt-verify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const update: FastifyPluginAsyncZod = async app => {
  app.patch(
    '/telefone/:idBarberShopPhone',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Telefones Barbearia'],
        params: z.object({
          idBarberShopPhone: z.string().uuid(),
        }),
        body: z.object({
          numero: z.string().optional(),
          tipo: z.enum(['celular', 'fixo']).optional(),
        }),
      },
    },
    async (request, response) => {
      const { idBarberShopPhone } = request.params
      const { numero, tipo } = request.body

      const updatePhoneBarberShopUseCase = makeUpdatePhoneBarberShopUseCase()

      try {
        await updatePhoneBarberShopUseCase.execute({
          idBarberShop: request.user.sub,
          idBarberShopPhone,
          data: {
            numero,
            tipo,
          },
        })
      } catch (error) {
        if (error instanceof ResourceNotFoundError) {
          return response.status(409).send({
            message: error.message,
          })
        }
      }

      return response.status(204).send()
    }
  )
}
