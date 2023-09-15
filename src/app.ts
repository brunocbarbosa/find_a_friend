import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { organizationsRoutes } from './http/controllers/organizations/routes'

export const app = fastify()

app.register(organizationsRoutes)

app.setErrorHandler((error, _req, rep) => {
  if (error instanceof ZodError) {
    return rep
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return rep.status(500).send({ message: 'Internal server error' })
})
