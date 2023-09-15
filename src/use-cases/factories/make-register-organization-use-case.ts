import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { RegisterOrganizationUseCase } from '../register-organization'

export function makeRegisterOrganizationUseCase() {
  const prismaOrganizationRepository = new PrismaOrganizationsRepository()
  const useCase = new RegisterOrganizationUseCase(prismaOrganizationRepository)

  return useCase
}
