export class BarberAlreadyExists extends Error {
  constructor() {
    super('E-Mail already exists')
  }
}
