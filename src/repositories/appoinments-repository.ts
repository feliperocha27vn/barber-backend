import type { Appointments, AppointmentsServices, Prisma } from '@prisma/client'

export interface AppointmentsRepository {
  create(data: Prisma.AppointmentsUncheckedCreateInput): Promise<Appointments>
  createAppointmentService(
    data: Prisma.AppointmentsServicesUncheckedCreateInput
  ): Promise<AppointmentsServices>
}
