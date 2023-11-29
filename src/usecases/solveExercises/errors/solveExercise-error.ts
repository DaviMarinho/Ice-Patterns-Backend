export class SolveExerciseError extends Error {
    constructor() {
      super('Erro ao registrar resposta do exercício')
      this.name = 'SolveExerciseError'
    }
  }
  