import { app } from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import { prisma } from '@/lib/prisma'
import { createPet } from '@/utils/test/create-pet'

describe('Search Pets By City (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to all pets by city', async () => {
    await createAndAuthenticateOrganization(app)

    const organization = await prisma.organization.findFirstOrThrow()

    await createPet(organization.id)

    const res = await request(app.server)
      .get('/pets/search')
      .query({
        query: 'cidade teste',
      })
      .send()

    expect(res.statusCode).toEqual(200)
    expect(res.body.pets).toHaveLength(1)
    expect(res.body.pets).toEqual([
      expect.objectContaining({
        organization_id: organization.id,
      }),
    ])
  })
})
