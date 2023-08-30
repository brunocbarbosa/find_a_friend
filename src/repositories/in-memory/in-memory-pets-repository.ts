import { Pet, Prisma, Age, Size, Energy, Independence } from '@prisma/client'
import { PetRepository } from '../pet-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: Age.ADULT,
      size: Size.BIG,
      energy: Energy.HIGH,
      independence: Independence.HIGH,
      requirement: data.requirement,
      isAdopted: false,
      organization_id: data.organization_id,
    }

    this.items.push(pet)

    return pet
  }
}
