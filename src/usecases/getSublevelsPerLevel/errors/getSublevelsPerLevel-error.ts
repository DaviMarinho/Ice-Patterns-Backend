export class GetSublevelsPerLevelError extends Error {
    constructor() {
      super('Erro ao buscar subníveis do nível')
      this.name = 'GetSublevelsPerLevelError'
    }
  }
  