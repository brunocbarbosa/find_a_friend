import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsUseCase } from '../search-pet'

export function makeSearchPetUseCase() {
  const prismaPetRepository = new PrismaPetsRepository()
  const useCase = new SearchPetsUseCase(prismaPetRepository)

  return useCase
}
