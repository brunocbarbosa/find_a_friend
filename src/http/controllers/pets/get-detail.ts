import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetDetailPetUseCase } from '@/use-cases/factories/make-get-detail-pet-use-case'

export async function getDetail(req: FastifyRequest, rep: FastifyReply) {
  const getDetailPetSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = getDetailPetSchema.parse(req.params)

  const getDetailPetUseCase = makeGetDetailPetUseCase()

  await getDetailPetUseCase.execute({
    petId,
  })

  return rep.status(200).send()
}
