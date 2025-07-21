import { makeRegisterUserUseCase } from '@/factories/users/make-register-use-case'
import { BarberAlreadyExists } from '@/use-cases/errors/barber-already-exists-error'
import { InvalidParameters } from '@/use-cases/errors/invalid-parameters-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const register: FastifyPluginAsyncZod = async app => {
  app.post(
    '/users/register',
    {
      schema: {
        tags: ['Usuários'],
        body: z.object({
          nome: z.string(),
          email: z.email(),
          telefone: z.string(),
        }),
      },
    },
    async (request, response) => {
      const { nome, email, telefone } = request.body

      const registerUseCase = makeRegisterUserUseCase()

      try {
        await registerUseCase.execute({
          nome,
          email,
          telefone,
        })

        return response.status(201).send()
      } catch (error) {
        if (error instanceof InvalidParameters) {
          return response.status(409).send({
            message: error.message,
          })
        }

        if (error instanceof BarberAlreadyExists) {
          return response.status(409).send({
            message: error.message,
          })
        }
      }
    }
  )
}
