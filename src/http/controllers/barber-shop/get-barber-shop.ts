import { makeGetBarberShopUseCase } from '@/factories/barber-shop/make-get-barber-shop-use-case'
import { verifyJwt } from '@/middlewares/jwt-verify'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsync } from 'fastify'

export const getBarberShop: FastifyPluginAsync = async app => {
  app.get(
    '/barbearia/get-barber-shop',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Barbearias'],
      },
    },
    async (request, response) => {
      await request.jwtVerify()

      const getBarberShopUseCase = makeGetBarberShopUseCase()

      try {
        const { barberShop } = await getBarberShopUseCase.execute({
          barberShopId: request.user.sub,
        })

        return response.status(200).send({
          ...barberShop,
          senha_hash: undefined,
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
