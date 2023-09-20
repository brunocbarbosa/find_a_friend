import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../register-pet'

export function makeRegisterPetUseCase() {
  const prismaPetRepository = new PrismaPetsRepository()
  const prismaOrganizationRepository = new PrismaOrganizationsRepository()
  const useCase = new RegisterPetUseCase(
    prismaPetRepository,
    prismaOrganizationRepository,
  )

  return useCase
}
