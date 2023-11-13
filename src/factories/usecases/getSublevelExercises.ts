import SublevelRepository from '../../repository/sublevel-repository'
import { GetSublevelExercisesUseCase } from '../../usecases/getSublevelExercises/use-case'
import ExerciseRepository from '../../repository/exercise-repository'

export const makeGetSublevelExercises = () => {
    const sublevelRepository = new SublevelRepository()
    const exerciseRepository = new ExerciseRepository()
  return new GetSublevelExercisesUseCase(sublevelRepository, exerciseRepository)
}
