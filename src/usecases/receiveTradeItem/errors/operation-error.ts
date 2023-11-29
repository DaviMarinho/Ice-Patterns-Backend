export class OperationError extends Error {
    constructor() {
      super('Falha ao verificar tipo de operação')
      this.name = 'OperationError'
    }
  }
  