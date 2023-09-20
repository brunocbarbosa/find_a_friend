import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchDogsUseCase } from './search-pet'

let petRepository: InMemoryPetsRepository
let sut: SearchDogsUseCase

describe('Search Pets use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    sut = new SearchDogsUseCase(petRepository)
  })

  it('should be able to search not adopted pets by organization city', async () => {
    await petRepository.create({
      name: 'Tuca',
      about: 'cachorrão grande',
      age: 'ADULT',
      size: 'MEDIUM',
      energy: 'HIGH',
      independence: 'HIGH',
      requirement: 'nehum',
      organization_id: 'org-01',
    })

    await petRepository.create({
      name: 'Belinha',
      about: 'cachorrinho',
      age: 'ADULT',
      size: 'SMALL',
      energy: 'MEDIUM',
      independence: 'HIGH',
      requirement: 'nehum',
      organization_id: 'org-01',
      is_adopted: true,
    })

    await petRepository.create({
      name: 'Negão',
      about: 'cachorrão vira lata',
      age: 'ADULT',
      size: 'MEDIUM',
      energy: 'HIGH',
      independence: 'HIGH',
      requirement: 'nehum',
      organization_id: 'org-02',
    })

    await petRepository.create({
      name: 'Rush',
      about: 'cachorro',
      age: 'ADULT',
      size: 'MEDIUM',
      energy: 'HIGH',
      independence: 'HIGH',
      requirement: 'nehum',
      organization_id: 'org-01',
    })

    const { pets } = await sut.execute({
      query: 'Pouso Alegre',
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ organization_id: 'org-01' }),
      expect.objectContaining({ organization_id: 'org-01' }),
    ])
  })

  it('should not be able to search adopted pets', async () => {
    await petRepository.create({
      name: 'Belinha',
      about: 'cachorrinho',
      age: 'ADULT',
      size: 'SMALL',
      energy: 'MEDIUM',
      independence: 'HIGH',
      requirement: 'nehum',
      organization_id: 'org-01',
      is_adopted: true,
    })

    await petRepository.create({
      name: 'Negão',
      about: 'cachorrão vira lata',
      age: 'ADULT',
      size: 'MEDIUM',
      energy: 'HIGH',
      independence: 'HIGH',
      requirement: 'nehum',
      organization_id: 'org-02',
      is_adopted: true,
    })

    const { pets } = await sut.execute({
      query: 'Pouso Alegre',
      page: 1,
    })

    expect(pets).toHaveLength(0)
  })

  it('should not be able to search pets from other cities', async () => {
    await petRepository.create({
      name: 'Negão',
      about: 'cachorrão vira lata',
      age: 'ADULT',
      size: 'MEDIUM',
      energy: 'HIGH',
      independence: 'HIGH',
      requirement: 'nehum',
      organization_id: 'org-02',
      is_adopted: true,
    })

    const { pets } = await sut.execute({
      query: 'Pouso Alegre',
      page: 1,
    })

    expect(pets).toHaveLength(0)
  })
})
