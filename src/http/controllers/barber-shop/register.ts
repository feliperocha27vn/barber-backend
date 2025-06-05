import { makeRegisterUseCase } from '@/factories/barber-shop/make-register-use-case'
import { BarberAlreadyExists } from '@/use-cases/errors/barber-already-exists-error'
import { InvalidParameters } from '@/use-cases/errors/invalid-parameters-error'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const register: FastifyPluginAsyncZod = async app => {
  app.post(
    '/barbearias/register',
    {
      schema: {
        body: z.object({
          nome: z.string(),
          email: z.string().email(),
          senha: z.string().min(6),
          area_atendimento: z.string(),
          CEP: z.string(),
          estado: z.string(),
          cidade: z.string(),
          bairro: z.string(),
          logradouro: z.string(),
          numero: z.string(),
          complemento: z.string().optional(),
        }),
      },
    },
    async (request, response) => {
      const {
        nome,
        email,
        senha,
        area_atendimento,
        CEP,
        estado,
        cidade,
        bairro,
        logradouro,
        numero,
        complemento,
      } = request.body

      const registerUseCase = makeRegisterUseCase()

      try {
        await registerUseCase.execute({
          nome,
          email,
          senha,
          area_atendimento,
          CEP,
          estado,
          cidade,
          bairro,
          logradouro,
          numero,
          complemento,
        })
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

        return response.status(201).send()
      }
    }
  )
}
