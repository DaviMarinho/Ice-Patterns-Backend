export class NotEnoughBoosterError extends Error {
    constructor() {
      super('Você não possui impulsionadores para ativar')
      this.name = 'NotEnoughBoosterError'
    }
  }
  