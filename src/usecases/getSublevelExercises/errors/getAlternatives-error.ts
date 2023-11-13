export class GetAlternativesError extends Error {
    constructor() {
      super('Erro ao buscar alternativas do exercício')
      this.name = 'GetAlternativesError'
    }
  }
  