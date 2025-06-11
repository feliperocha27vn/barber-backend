import { makeCreateServiceBarberShopUseCase } from '@/factories/services-barber-shop/make-create-use-case'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const create: FastifyPluginAsyncZod = async app => {
  app.post(
    '/barbearias/servicos',
    {
      schema: {
        body: z.object({
          nome: z.string(),
          descricao: z.string(),
          preco: z.coerce.number(),
          barberShopId: z.string().uuid(),
        }),
      },
    },
    async (request, response) => {
      const { nome, descricao, preco, barberShopId } = request.body

      const createServiceBarberShopUseCase =
        makeCreateServiceBarberShopUseCase()

      await createServiceBarberShopUseCase.execute({
        nome,
        descricao,
        preco,
        barberShopId,
      })

      return response.status(201).send()
    }
  )
}
