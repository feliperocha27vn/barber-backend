export class UserEmailAlreadyExistsError extends Error {
  constructor() {
    super('E-Mail already exists')
  }
}
