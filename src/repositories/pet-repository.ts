import { Prisma, Pet } from '@prisma/client'

export interface PetRepository {
  findById(id: string): Promise<Pet | null>
  searchMany(queries: string, page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
