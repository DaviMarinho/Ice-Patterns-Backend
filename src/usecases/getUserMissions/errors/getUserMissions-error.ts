export class GetUserMissionsError extends Error {
    constructor() {
      super('Erro ao buscar missões do usuário')
      this.name = 'GetUserMissionsError'
    }
  }
  