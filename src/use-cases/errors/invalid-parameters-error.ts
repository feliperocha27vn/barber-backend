export class InvalidParameters extends Error {
  constructor(message?: string) {
    super(message ? `Parameters invalids: ${message}` : 'Parameters invalids')
  }
}
