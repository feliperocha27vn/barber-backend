import type { AppointmentsRepository } from '@/repositories/appoinments-repository'
import type { BarberShopRepository } from '@/repositories/barber-shop-repository'
import type { ServicesBarberShopRepository } from '@/repositories/services-barber-shop-repository'
import type { UsersRepository } from '@/repositories/users-repository'
import type { Appointments } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface CreateAppointmentUseCaseRequest {
  agendado_para: Date
  barberShopId: string
  userId: string
  serviceId: string
}

interface CreateAppointmentUseCaseResponse {
  appointment: Appointments
}

export class CreateAppointmentUseCase {
  constructor(
    private appointmentsRepository: AppointmentsRepository,
    private barberShopRepository: BarberShopRepository,
    private usersRepository: UsersRepository,
    private servicesRepository: ServicesBarberShopRepository
  ) {}

  async execute({
    agendado_para,
    barberShopId,
    userId,
    serviceId,
  }: CreateAppointmentUseCaseRequest): Promise<CreateAppointmentUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError('User')
    }

    const barberShop = await this.barberShopRepository.findById(barberShopId)

    if (!barberShop) {
      throw new ResourceNotFoundError('Barber shop')
    }

    const service = await this.servicesRepository.findById(
      barberShopId,
      serviceId
    )

    if (!service) {
      throw new ResourceNotFoundError('Service')
    }

    const appointment = await this.appointmentsRepository.create({
      agendado_para,
      barberShopId,
      userId,
    })

    const appointmentService =
      await this.appointmentsRepository.createAppointmentService({
        appointmentsId: appointment.id,
        servicesId: serviceId,
      })

    return { appointment }
  }
}
