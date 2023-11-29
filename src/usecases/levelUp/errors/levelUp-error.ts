export class LevelUpError extends Error {
    constructor() {
      super('Falha ao desbloquear novo nível do usuário')
      this.name = 'LevelUpError'
    }
  }
  