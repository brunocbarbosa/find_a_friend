import { Prisma, Pet } from '@prisma/client'

export interface PetRepository {
  searchMany(queries: string, page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
