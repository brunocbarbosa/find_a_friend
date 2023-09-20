import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pet-use-case'

export async function search(req: FastifyRequest, rep: FastifyReply) {
  const searchPetQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchPetQuerySchema.parse(req.query)

  const searchPetUseCase = makeSearchPetUseCase()

  const { pets } = await searchPetUseCase.execute({
    query,
    page,
  })

  return rep.status(200).send({ pets })
}
