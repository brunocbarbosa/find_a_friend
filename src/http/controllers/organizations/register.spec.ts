import request from 'supertest'
import { app } from '@/app'
import { describe } from 'node:test'
import { afterAll, beforeAll, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const res = await request(app.server).post('/organizations').send({
      name: 'John Doe',
      email: 'john@test.com',
      password: '123456',
      city: 'cidade teste',
      address: 'rua test, 20, bairro test',
      cep: '00-000000',
      whatsapp: '(00)00000-0000',
    })

    expect(res.statusCode).toEqual(201)
  })
})
