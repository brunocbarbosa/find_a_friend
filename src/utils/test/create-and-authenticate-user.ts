import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      name: 'John Doe',
      email: 'john@test.com',
      password_hash: await hash('123456', 6),
      city: 'cidade teste',
      address: 'rua test, 20, bairro test',
      cep: '00-000000',
      whatsapp: '(00)00000-0000',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john@test.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
