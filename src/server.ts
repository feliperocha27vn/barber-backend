import { app } from './app'
import { fastifyCors } from '@fastify/cors'
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'

import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { env } from './env'
import { barberShopRoutes } from './http/controllers/barber-shop-routes'
import { servicesBarberShopRoutes } from './http/controllers/services-barber-shop'
import fastifyJwt from '@fastify/jwt'


app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server is running: http://localhost:3333/docs 🦅')
})
