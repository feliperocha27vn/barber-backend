import { InMemoryAppointmentsRepository } from '@/in-memory/in-memory-appoinments-repository'
import { InMemoryBarberShopRepository } from '@/in-memory/in-memory-barber-shop-repository'
import { InMemoryServicesBarberShopRepository } from '@/in-memory/in-memory-services-barber-shop-repository'
import { InMemoryUsersRepository } from '@/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InvalidParameters } from '../errors/invalid-parameters-error'
import { CreateAppointmentUseCase } from './create'

let sut: CreateAppointmentUseCase
let barberShopRepository: InMemoryBarberShopRepository
let usersRepository: InMemoryUsersRepository
let servicesRepository: InMemoryServicesBarberShopRepository
let appointmentsRepository: InMemoryAppointmentsRepository

describe('Create new appointment use case', () => {
  beforeEach(() => {
    barberShopRepository = new InMemoryBarberShopRepository()
    usersRepository = new InMemoryUsersRepository()
    servicesRepository = new InMemoryServicesBarberShopRepository()
    appointmentsRepository = new InMemoryAppointmentsRepository()
    sut = new CreateAppointmentUseCase(
      appointmentsRepository,
      barberShopRepository,
      usersRepository,
      servicesRepository
    )
    // para testes de datas retroativas
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('deve garantir que o agendamento seja criado', async () => {
    vi.setSystemTime(new Date('2025-07-20T13:00:00Z'))

    const user = await usersRepository.create({
      nome: 'John Doe',
      email: 'johndoe@example.com',
      telefone: '123456789',
    })

    const barberShop = await barberShopRepository.create({
      nome: 'Barbearia do João',
      email: 'contato@barbeariadojoao.com.br',
      senha_hash: await hash('123', 6),
      area_atendimento: 'Centro',
      CEP: '01310-100',
      estado: 'SP',
      cidade: 'São Paulo',
      bairro: 'Bela Vista',
      logradouro: 'Avenida Paulista',
      numero: '1578',
      complemento: 'Sala 205',
    })

    const service = await servicesRepository.create({
      nome: 'Corte de cabelo',
      descricao: 'Corte de cabelo masculino',
      preco: 50,
      barber_shop_id: barberShop.id,
    })

    const { appointment } = await sut.execute({
      agendado_para: new Date('2025-07-20T14:00:00Z'),
      barberShopId: barberShop.id,
      userId: user.id,
      serviceId: service.id,
    })

    const appointmentService =
      await appointmentsRepository.createAppointmentService({
        servicesId: service.id,
        appointmentsId: appointment.id,
      })

    expect(appointment.id).toEqual(expect.any(String))
    expect(appointment).toEqual(
      expect.objectContaining({
        // espero que tenha um data
        agendado_para: new Date('2025-07-20T14:00:00Z'),
      })
    )
    expect(appointmentService).toEqual(
      expect.objectContaining({
        appointmentsId: appointment.id,
      })
    )
  })
  //TODO
  it('deve garantiar que o usuário não faça agendamento em uma data retroativa', async () => {
    vi.setSystemTime(new Date('2025-07-20T13:00:00Z'))

    const user = await usersRepository.create({
      nome: 'John Doe',
      email: 'johndoe@example.com',
      telefone: '123456789',
    })

    const barberShop = await barberShopRepository.create({
      nome: 'Barbearia do João',
      email: 'contato@barbeariadojoao.com.br',
      senha_hash: await hash('123', 6),
      area_atendimento: 'Centro',
      CEP: '01310-100',
      estado: 'SP',
      cidade: 'São Paulo',
      bairro: 'Bela Vista',
      logradouro: 'Avenida Paulista',
      numero: '1578',
      complemento: 'Sala 205',
    })

    const service = await servicesRepository.create({
      nome: 'Corte de cabelo',
      descricao: 'Corte de cabelo masculino',
      preco: 50,
      barber_shop_id: barberShop.id,
    })

    expect(() =>
      sut.execute({
        agendado_para: new Date('2025-06-20T14:00:00Z'),
        userId: user.id,
        barberShopId: barberShop.id,
        serviceId: service.id,
      })
    ).rejects.toBeInstanceOf(InvalidParameters)
  })
})
