import { makeAuthenticationUseCase } from '@/factories/barber-shop/make-authentication-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const login: FastifyPluginAsyncZod = async app => {
  app.post(
    '/barbearias/login',
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          senha: z.string(),
        }),
      },
    },
    async (request, response) => {
      const { email, senha } = request.body

      const authenticationUseCase = makeAuthenticationUseCase()

      try {
        const barberShop = await authenticationUseCase.execute({
          email,
          senha,
        })

        return response.status(200).send(barberShop)
      } catch (error) {
        if (error instanceof InvalidCredentialsError) {
          return response.status(409).send({
            message: error.message,
          })
        }
      }
    }
  )
}
