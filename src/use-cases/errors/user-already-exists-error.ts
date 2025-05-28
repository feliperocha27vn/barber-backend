export class UserAlreadyExists extends Error {
  constructor() {
    super('E-Mail already exists')
  }
}
