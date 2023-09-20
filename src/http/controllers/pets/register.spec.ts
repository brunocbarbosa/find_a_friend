import { app } from '@/app'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.organization.findFirstOrThrow()

    console.log(token)

    const res = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Tuca',
        about: 'cachorrão grande',
        age: 'ADULT',
        size: 'MEDIUM',
        energy: 'HIGH',
        independence: 'HIGH',
        requirement: 'nehum',
        organizationId: user.id,
      })

    expect(res.statusCode).toEqual(201)
  })
})
