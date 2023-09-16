import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaOrganizationRepository = new PrismaOrganizationsRepository()
  const useCase = new AuthenticateUseCase(prismaOrganizationRepository)

  return useCase
}
