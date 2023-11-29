export class GetExerciseError extends Error {
    constructor() {
      super('Exercício não encontrado')
      this.name = 'GetExerciseError'
    }
  }
  