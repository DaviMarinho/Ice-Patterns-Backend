export class GetAchievementError extends Error {
    constructor() {
      super('Conquista não encontrada')
      this.name = 'GetAchievementError'
    }
  }
  