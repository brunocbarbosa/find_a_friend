import {
  Pet,
  Prisma,
  Age,
  Size,
  Energy,
  Independence,
  Organization,
} from '@prisma/client'
import { PetRepository } from '../pet-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetRepository {
  public items: Pet[] = []

  async searchMany(query: string, page: number) {
    const org: Organization[] = [
      {
        id: 'org-01',
        name: 'John Doe',
        email: 'john@test.com',
        password_hash: '123456',
        city: 'Pouso Alegre',
        address: 'rua test, 20, bairro test',
        cep: '00-000000',
        whatsapp: '(00)00000-0000',
        created_at: new Date(),
      },
      {
        id: 'org-02',
        name: 'John Doe2',
        email: 'john2@test.com',
        password_hash: '123456',
        city: 'Santa Rita',
        address: 'rua test, 20, bairro test',
        cep: '00-000000',
        whatsapp: '(00)00000-0000',
        created_at: new Date(),
      },
    ]

    const orgsByCity = org.filter((item) => item.city === query)

    return this.items
      .filter((pet) =>
        orgsByCity.some(
          (org) => pet.organization_id === org.id && !pet.is_adopted,
        ),
      )
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age || Age.ADULT,
      size: data.size || Size.BIG,
      energy: data.energy || Energy.HIGH,
      independence: data.independence || Independence.HIGH,
      requirement: data.requirement,
      is_adopted: data.is_adopted || false,
      organization_id: data.organization_id,
    }

    this.items.push(pet)

    return pet
  }
}
