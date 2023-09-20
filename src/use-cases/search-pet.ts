import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

interface SearchDogsUseCaseRequest {
  query: string
  page: number
}

interface SearchDogsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    query,
    page,
  }: SearchDogsUseCaseRequest): Promise<SearchDogsUseCaseResponse> {
    const pets = await this.petRepository.searchMany(query, page)

    return {
      pets,
    }
  }
}
