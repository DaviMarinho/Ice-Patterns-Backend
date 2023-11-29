import SublevelRepository from '../../repository/sublevel-repository'
import { GetSublevelsPerLevelUseCase } from '../../usecases/getSublevelsPerLevel/use-case'
import ExerciseRepository from '../../repository/exercise-repository'
import AlternativeRepository from '../../repository/alternative-repository'

export const makeGetSublevelsPerLevel = () => {
    const sublevelRepository = new SublevelRepository()
  return new GetSublevelsPerLevelUseCase(sublevelRepository)
}
