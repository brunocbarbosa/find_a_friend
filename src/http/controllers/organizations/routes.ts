import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', register)
  app.get('/me', profile)

  app.post('/sessions', authenticate)
}
