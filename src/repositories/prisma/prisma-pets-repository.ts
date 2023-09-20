import { Prisma } from '@prisma/client'
import { PetRepository } from '../pet-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async searchMany(query: string, page: number) {
    const petsByOrganizationCity = await prisma.organization.findMany({
      where: {
        city: query,
      },

      select: {
        Pet: true,
      },

      take: 20,
      skip: (page - 1) * 20,
    })
    return petsByOrganizationCity[0].Pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
