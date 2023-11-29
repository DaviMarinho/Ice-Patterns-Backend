import { GetSublevelExercisesController } from '../../controllers/getSublevelExercises'
import { makeGetSublevelExercises } from '../usecases/getSublevelExercises'

export const makeGetSublevelExercisesController = () => {
  return new GetSublevelExercisesController(makeGetSublevelExercises())
}
