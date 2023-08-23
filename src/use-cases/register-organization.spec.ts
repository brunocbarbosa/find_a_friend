import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterOrganizationUseCase } from './register-organization'
import { compare } from 'bcryptjs'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterOrganizationUseCase

describe('Organization use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationUseCase(organizationsRepository)
  })

  it('should be able to register', async () => {
    const { organization } = await sut.execute({
      name: 'John Doe',
      email: 'john@test.com',
      password: '123456',
      addess: 'rua test, 20, bairro test',
      cep: '00-000000',
      whatsapp: '(00)00000-0000',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'John Doe',
      email: 'john@test.com',
      password: '123456',
      addess: 'rua test, 20, bairro test',
      cep: '00-000000',
      whatsapp: '(00)00000-0000',
    })

    const isPasswordCorrectelyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectelyHashed).toBe(true)
  })

  it('should not be able to register with the same email', async () => {
    const email = 'john@test.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
      addess: 'rua test, 20, bairro test',
      cep: '00-000000',
      whatsapp: '(00)00000-0000',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
        addess: 'rua test, 20, bairro test',
        cep: '00-000000',
        whatsapp: '(00)00000-0000',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
