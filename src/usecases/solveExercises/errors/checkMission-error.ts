export class CheckMissionError extends Error {
    constructor() {
      super('Falha ao buscar progresso de missão')
      this.name = 'CheckMissionError'
    }
  }
  