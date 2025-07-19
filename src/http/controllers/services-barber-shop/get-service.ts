import { makeGetServiceBarberShopUseCase } from '@/factories/services-barber-shop/make-get-service-barber-shop-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getServiceBarberShop: FastifyPluginAsyncZod = async app => {
  app.get(
    '/servico/:idBarberShop/:idServiceBarberShop',
    {
      schema: {
        tags: ['Serviços da Barbearia'],
        params: z.object({
          idBarberShop: z.uuid(),
          idServiceBarberShop: z.uuid(),
        }),
      },
    },
    async (request, response) => {
      const { idBarberShop, idServiceBarberShop } = request.params

      const getServiceBarberShopUseCase = makeGetServiceBarberShopUseCase()

      try {
        const { service } = await getServiceBarberShopUseCase.execute({
          idBarberShop: idBarberShop,
          idService: idServiceBarberShop,
        })

        return response.status(200).send({ service })
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
