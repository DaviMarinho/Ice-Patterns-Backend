export class ActivateBoosterError extends Error {
    constructor() {
      super('Falha ao ativar impulsionador')
      this.name = 'ActivateBoosterError'
    }
  }
  