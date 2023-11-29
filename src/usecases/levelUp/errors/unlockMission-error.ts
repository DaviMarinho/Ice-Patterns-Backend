export class UnlockMissionError extends Error {
    constructor() {
      super('Falha ao desbloquear nova missão')
      this.name = 'UnlockMissionError'
    }
  }
  