import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { phoneBarberShopRoutes } from './http/controllers/barber-shop-phones/routes'
import { barberShopRoutes } from './http/controllers/barber-shop/routes'
import { servicesBarberShopRoutes } from './http/controllers/services-barber-shop/routes'
import { usersRoutes } from './http/controllers/users/routes'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: true,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Barber API Documentation',
      description:
        'Todas as requisições após o login precisam estar autorizadas com token JWT.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(barberShopRoutes)
app.register(servicesBarberShopRoutes)
app.register(phoneBarberShopRoutes)
app.register(usersRoutes)
