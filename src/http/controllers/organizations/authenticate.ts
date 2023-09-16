import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateSchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { organization } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await rep.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    return rep.status(200).send({
      token,
    })
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return rep.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
