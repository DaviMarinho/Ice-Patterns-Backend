export interface ExerciseIdCorrect {
    exerciseId: string,
    isCorrect: boolean
}

export interface SolveExercisesRequest {
    username: string
    exercises: ExerciseIdCorrect[]
}
  