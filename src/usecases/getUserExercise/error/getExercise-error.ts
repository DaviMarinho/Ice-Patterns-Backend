export class GetExerciseError extends Error {
    constructor() {
      super('Exercício não informado')
      this.name = 'GetExerciseError'
    }
  }
  