import ExerciseRepository from '../../repository/exercise-repository'
import UserRepository from '../../repository/user/repository'
import UserExerciseRepository from '../../repository/userExercise-repository'
import UserMissionRepository from '../../repository/userMission-repository'
import { SolveExercisesUseCase } from '../../usecases/solveExercises/use-case'

export const makeSolveExercises = () => {
  const userRepository = new UserRepository()
  const exerciseRepository = new ExerciseRepository()
  const userExerciseRepository = new UserExerciseRepository()
  const userMissionRepository = new UserMissionRepository()
  return new SolveExercisesUseCase(userRepository, exerciseRepository, userExerciseRepository, userMissionRepository)
}
