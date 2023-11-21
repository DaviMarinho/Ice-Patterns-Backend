import { SolveExercisesController } from '../../controllers/solveExercises'
import { makeSolveExercises } from '../usecases/solveExercises'

export const makeSolveExercisesController = () => {
  return new SolveExercisesController(makeSolveExercises())
}
