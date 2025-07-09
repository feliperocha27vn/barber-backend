import { makeCreatePhoneBarberShopUseCase } from '@/factories/barber-shop-phones/make-create-use-case'
import { makeDeletePhoneBarberShopUseCase } from '@/factories/barber-shop-phones/make-delete-use-case'
import { makeDeleteServiceBarberShopUseCase } from '@/factories/services-barber-shop/make-delete-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deletePhone: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/telefone/:idBarberShopPhone',
    {
      schema: {
        tags: ['Telefones Barbearia'],
        params: z.object({
          idBarberShopPhone: z.string().uuid(),
        }),
      },
    },
    async (request, response) => {
      const { idBarberShopPhone } = request.params

      const deleteBarberShopPhoneUseCase = makeDeletePhoneBarberShopUseCase()

      try {
        await deleteBarberShopPhoneUseCase.execute({
          idBarberShopPhone,
          idBarberShop: request.user.sub,
        })

        return response.status(204).send()
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
