import SublevelRepository from '../../repository/sublevel-repository'
import { GetSublevelExercisesUseCase } from '../../usecases/getSublevelExercises/use-case'
import ExerciseRepository from '../../repository/exercise-repository'
import AlternativeRepository from '../../repository/alternative-repository'

export const makeGetSublevelExercises = () => {
    const sublevelRepository = new SublevelRepository()
    const exerciseRepository = new ExerciseRepository()
    const alternativeRepository = new AlternativeRepository()
  return new GetSublevelExercisesUseCase(sublevelRepository, exerciseRepository, alternativeRepository)
}
