export class InitialSublevelError extends Error {
    constructor() {
      super('Erro ao inicializar o primeiro subnível para o usuário')
      this.name = 'InitialSublevelError'
    }
  }