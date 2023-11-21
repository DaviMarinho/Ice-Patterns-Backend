import ExerciseRepository from '../../repository/exercise-repository'
import UserRepository from '../../repository/user/repository'
import UserExerciseRepository from '../../repository/userExercise-repository'
import { SolveExercisesUseCase } from '../../usecases/solveExercises/use-case'

export const makeSolveExercises = () => {
  const userRepository = new UserRepository()
  const exerciseRepository = new ExerciseRepository()
  const userExerciseRepository = new UserExerciseRepository()
  return new SolveExercisesUseCase(userRepository, exerciseRepository, userExerciseRepository)
}
