export class ReceiveAchievementError extends Error {
    constructor() {
      super('Falha ao dar conquista ao usuário')
      this.name = 'ReceiveAchievementError'
    }
  }
  