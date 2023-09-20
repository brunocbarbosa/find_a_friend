import { Prisma, Pet } from '@prisma/client'

export interface PetRepository {
  findById(id: string): Promise<Pet | null>
  searchMany(query: string, page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
