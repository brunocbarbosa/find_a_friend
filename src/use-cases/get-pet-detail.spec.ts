import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetDetailUseCase } from './get-pet-detail'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository
let sut: GetPetDetailUseCase

describe('Pet use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new GetPetDetailUseCase(petRepository)

    organizationRepository.items.push({
      id: 'org-01',
      name: 'John Doe',
      email: 'john@test.com',
      password_hash: '123456',
      city: 'cidade',
      address: 'rua test, 20, bairro test',
      cep: '00-000000',
      whatsapp: '(00)00000-0000',
      created_at: new Date(),
    })
  })

  it('should be get a pet detail', async () => {
    const createdPet = await petRepository.create({
      name: 'Tuca',
      about: 'cachorrão grande',
      age: 'ADULT',
      size: 'MEDIUM',
      energy: 'HIGH',
      independence: 'HIGH',
      requirement: 'nehum',
      organization_id: 'org-01',
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Tuca')
  })

  it('Should not be able to get pet detail with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'null-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
