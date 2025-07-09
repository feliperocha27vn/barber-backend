import { makeCreatePhoneBarberShopUseCase } from '@/factories/barber-shop-phones/make-create-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const create: FastifyPluginAsyncZod = async app => {
  app.post(
    '/telefone',
    {
      schema: {
        tags: ['Telefones Barbearia'],
        body: z.object({
          numero: z.string(),
          tipo: z.enum(['celular', 'fixo']),
        }),
      },
    },
    async (request, response) => {
      const { numero, tipo } = request.body

      const createBarberShopPhoneUseCase = makeCreatePhoneBarberShopUseCase()

      try {
        const { phoneBarberShop } = await createBarberShopPhoneUseCase.execute({
          numero,
          tipo,
          barberShopId: request.user.sub,
        })

        return response.status(201).send({
          phoneBarberShop,
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
