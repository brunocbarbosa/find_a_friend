import { OrganizationRepository } from '@/repositories/organizations-repository'
import { PetRepository } from '@/repositories/pet-repository'
// import { Age, Energy, Independence, Size } from '@/utils/enums'
import { Age, Size, Energy, Independence, Pet } from '@prisma/client'
// import { Pet } from '@/utils/types'
import { OrganizationNotFoundError } from './errors/organization-not-found-error'

interface registerPetUseCaseRequest {
  name: string
  about: string
  age?: Age
  size?: Size
  energy?: Energy
  independence?: Independence
  requirement: string
  organizationId: string
}

interface registerPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petRepository: PetRepository,
    private organizationRepository: OrganizationRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energy,
    independence,
    requirement,
    organizationId,
  }: registerPetUseCaseRequest): Promise<registerPetUseCaseResponse> {
    const organization =
      await this.organizationRepository.findById(organizationId)

    if (!organization) {
      throw new OrganizationNotFoundError()
    }

    const pet = await this.petRepository.create({
      name,
      about,
      age,
      size,
      energy,
      independence,
      requirement,
      organization_id: organizationId,
    })

    return {
      pet,
    }
  }
}
