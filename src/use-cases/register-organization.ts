import { OrganizationRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

interface registerOrganizationUseCaseRequest {
  name: string
  email: string
  cep: string
  addess: string
  whatsapp: string
  password: string
}

interface registerOrganizationUseCaseResponse {
  organization: Organization
}

export class RegisterOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    name,
    email,
    addess,
    cep,
    password,
    whatsapp,
  }: registerOrganizationUseCaseRequest): Promise<registerOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail =
      await this.organizationRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError()
    }

    const organization = await this.organizationRepository.create({
      name,
      email,
      addess,
      cep,
      password_hash,
      whatsapp,
    })

    return {
      organization,
    }
  }
}
