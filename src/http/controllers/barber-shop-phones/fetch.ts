import { makeFetchPhonesBarberShopUseCase } from '@/factories/barber-shop-phones/make-fetch-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const fetchPhonesBarberShop: FastifyPluginAsyncZod = async app => {
  app.get(
    '/telefones',
    {
      schema: {
        tags: ['Telefones Barbearia'],
      },
    },
    async (request, response) => {
      const fetchPhonesBarberShopUseCase = makeFetchPhonesBarberShopUseCase()

      try {
        const { phoneBarberShop } = await fetchPhonesBarberShopUseCase.execute({
          barberShopId: request.user.sub,
        })

        return response.status(200).send({ phoneBarberShop })
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
