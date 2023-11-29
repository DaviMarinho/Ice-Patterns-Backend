export class GetUserAchievementsError extends Error {
    constructor() {
      super('Erro ao buscar conquistas do usuário')
      this.name = 'GetUserAchievementsError'
    }
  }
  