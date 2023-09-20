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
    requirement: z.string(),
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

  return rep.status(201).send()
}
