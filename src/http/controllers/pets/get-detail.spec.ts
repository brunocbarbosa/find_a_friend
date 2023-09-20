import { app } from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import { prisma } from '@/lib/prisma'
import { createPet } from '@/utils/test/create-pet'

describe('Get Pet Detail (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet detail', async () => {
    await createAndAuthenticateOrganization(app)

    const organization = await prisma.organization.findFirstOrThrow()

    const { pet } = await createPet(organization.id)

    const res = await request(app.server).get(`/pets/${pet.id}`).send({})

    expect(res.statusCode).toEqual(200)
  })
})
