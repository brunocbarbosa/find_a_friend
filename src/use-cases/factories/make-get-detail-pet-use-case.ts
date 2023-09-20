import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetDetailUseCase } from '../get-pet-detail'

export function makeGetDetailPetUseCase() {
  const prismaPetRepository = new PrismaPetsRepository()
  const useCase = new GetPetDetailUseCase(prismaPetRepository)

  return useCase
}
