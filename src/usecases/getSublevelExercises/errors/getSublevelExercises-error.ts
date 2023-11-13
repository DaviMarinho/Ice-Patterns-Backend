export class GetSublevelExercisesError extends Error {
    constructor() {
      super('Erro ao buscar exercícios')
      this.name = 'GetSublevelExercisesError'
    }
  }
  