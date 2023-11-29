export class GetSublevelError extends Error {
    constructor() {
      super('Erro ao buscar subnível')
      this.name = 'GetSublevelError'
    }
  }
  