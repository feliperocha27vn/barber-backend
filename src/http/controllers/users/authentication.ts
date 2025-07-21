import { makeAuthenticationUserUseCase } from '@/factories/users/make-authentication-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const authentication: FastifyPluginAsyncZod = async app => {
  app.post(
    '/user/authentication',
    {
      schema: {
        tags: ['Usuários'],
        body: z.object({
          email: z.email(),
        }),
      },
    },
    async (request, response) => {
      const { email } = request.body

      const authenticationUseCase = makeAuthenticationUserUseCase()

      try {
        const { user } = await authenticationUseCase.execute({
          email,
        })

        const token = await response.jwtSign(
          {},
          {
            sign: { sub: user.id },
          }
        )

        return response.status(200).send({ token })
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
