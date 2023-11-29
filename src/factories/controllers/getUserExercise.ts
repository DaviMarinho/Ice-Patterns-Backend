import { GetUserExerciseController } from '../../controllers/getUserExercise'
import { makeGetUserExercise } from '../usecases/getUserExercise'

export const makeGetUserExerciseController = () => {
  return new GetUserExerciseController(makeGetUserExercise())
}
