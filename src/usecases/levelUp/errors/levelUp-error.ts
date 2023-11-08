export class LevelUpError extends Error {
    constructor() {
      super('Falha subir desbloquear novo nível do usuário')
      this.name = 'LevelUpError'
    }
  }
  