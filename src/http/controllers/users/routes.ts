import type { FastifyPluginAsync } from 'fastify'
import { authentication } from './authentication'
import { register } from './register'

export const usersRoutes: FastifyPluginAsync = async app => {
  app.register(register)
  app.register(authentication)
}
