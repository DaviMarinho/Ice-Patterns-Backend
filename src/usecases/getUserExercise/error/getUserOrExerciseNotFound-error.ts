export class GetUserOrExerciseNotFoundError extends Error {
    constructor() {
      super('Usuário ou exercício informados não foram encontrados')
      this.name = 'GetUserOrExerciseNotFoundError'
    }
  }
  