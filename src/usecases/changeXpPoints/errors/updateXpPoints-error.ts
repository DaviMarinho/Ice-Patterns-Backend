export class UpdateXpPointsError extends Error {
    constructor() {
      super('Falha ao atualizar pontos de experiência do usuário')
      this.name = 'UpdateXpPointsError'
    }
  }
  