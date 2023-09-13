import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrganizationNotFoundError } from './errors/organization-not-found-error'

let petRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository
let sut: RegisterPetUseCase

describe('Pet use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterPetUseCase(petRepository, organizationRepository)

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

  it('should be able to register', async () => {
    const { pet } = await sut.execute({
      name: 'Tuca',
      about: 'cachorrão grande',
      age: 'YOUNG',
      independence: 'MEDIUM',
      requirement: 'nehum',
      organizationId: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register without organization', async () => {
    await expect(() =>
      sut.execute({
        name: 'Tuca',
        about: 'cachorrão grande',
        age: 'YOUNG',
        independence: 'MEDIUM',
        requirement: 'nehum',
        organizationId: 'org-02',
      }),
    ).rejects.toBeInstanceOf(OrganizationNotFoundError)
  })
})
