import { prisma } from '@/lib/prisma'

export async function createPet(organizationId: string) {
  const pet = await prisma.pet.create({
    data: {
      name: 'Tuca',
      about: 'cachorrão grande',
      age: 'ADULT',
      size: 'MEDIUM',
      energy: 'HIGH',
      independence: 'HIGH',
      requirement: 'nehum',
      organization_id: organizationId,
    },
  })

  return {
    pet,
  }
}
