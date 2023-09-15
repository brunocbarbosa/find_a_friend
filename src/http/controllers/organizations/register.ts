import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const registerOrganizationSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cep: z.string(),
    city: z.string(),
    address: z.string(),
    whatsapp: z.string(),
    password: z.string().min(6),
  })

  const { name, email, cep, city, address, whatsapp, password } =
    registerOrganizationSchema.parse(req.body)

  try {
    const registerOrganizationUseCase = makeRegisterOrganizationUseCase()

    await registerOrganizationUseCase.execute({
      name,
      email,
      cep,
      city,
      address,
      whatsapp,
      password,
    })
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return rep.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return rep.status(201).send()
}
