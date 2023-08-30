import { Prisma, Organization } from '@prisma/client'

export interface OrganizationRepository {
  findById(id: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
}
