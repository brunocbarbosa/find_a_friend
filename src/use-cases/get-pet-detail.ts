import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetDetailUseCaseRequest {
  petId: string
}

interface GetPetDetailUseCaseResponse {
  pet: Pet
}

export class GetPetDetailUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    petId,
  }: GetPetDetailUseCaseRequest): Promise<GetPetDetailUseCaseResponse> {
    const pet = await this.petRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
