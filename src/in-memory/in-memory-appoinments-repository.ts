import type { AppointmentsRepository } from '@/repositories/appoinments-repository'
import type { Appointments, AppointmentsServices, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  private appointments: Appointments[] = []
  private appointmentsServices: AppointmentsServices[] = []

  async create(data: Prisma.AppointmentsUncheckedCreateInput) {
    const appointment = {
      id: data.id ?? randomUUID(),
      agendado_para: new Date(data.agendado_para),
      barberShopId: data.barberShopId,
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: new Date() ?? null,
    }

    this.appointments.push(appointment)

    return appointment
  }

  async createAppointmentService(
    data: Prisma.AppointmentsServicesUncheckedCreateInput
  ) {
    const appointmentService = {
      id: data.id ?? randomUUID(),
      appointmentsId: data.appointmentsId,
      servicesId: data.servicesId,
    }

    this.appointmentsServices.push(appointmentService)

    return appointmentService
  }
}
