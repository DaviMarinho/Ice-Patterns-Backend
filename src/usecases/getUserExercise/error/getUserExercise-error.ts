export class GetUserExerciseError extends Error {
    constructor() {
      super('Não foi possível verificar exercício realizado pelo usuário')
      this.name = 'GetUserExerciseError'
    }
  }
  