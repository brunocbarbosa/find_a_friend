import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { Age, Size, Energy, Independence } from '@prisma/client'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const registerPetSchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.nativeEnum(Age),
    size: z.nativeEnum(Size),
    energy: z.nativeEnum(Energy),
    independence: z.nativeEnum(Independence),
    requirement: z.string().min(6),
    organizationId: z.string().uuid(),
  })

  const {
    name,
    about,
    age,
    size,
    energy,
    independence,
    requirement,
    organizationId,
  } = registerPetSchema.parse(req.body)

  try {
    const registerPetUseCase = makeRegisterPetUseCase()

    await registerPetUseCase.execute({
      name,
      about,
      age,
      size,
      energy,
      independence,
      requirement,
      organizationId,
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
