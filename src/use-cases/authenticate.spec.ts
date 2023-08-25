import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credential-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateUseCase

describe('Authenticate use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationsRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationsRepository.create({
      name: 'John Doe',
      email: 'john@test.com',
      password_hash: await hash('123456', 6),
      addess: 'rua test, 20, bairro test',
      cep: '00-000000',
      whatsapp: '(00)00000-0000',
    })

    const { organization } = await sut.execute({
      email: 'john@test.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with a wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'john@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationsRepository.create({
      name: 'John Doe',
      email: 'john@test.com',
      password_hash: await hash('123456', 6),
      addess: 'rua test, 20, bairro test',
      cep: '00-000000',
      whatsapp: '(00)00000-0000',
    })

    await expect(() =>
      sut.execute({
        email: 'john@test.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
