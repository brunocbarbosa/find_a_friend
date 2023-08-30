import { Organization, Prisma } from '@prisma/client'
import { OrganizationRepository } from '../organizations-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationsRepository implements OrganizationRepository {
  public items: Organization[] = []

  async findById(id: string) {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      cep: data.cep,
      addess: data.addess,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }
}
