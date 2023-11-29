import Repository from '../../repository/user/repository'
import { GetUserExerciseUseCase } from '../../usecases/getUserExercise/use-case'
import ExerciseRepository from '../../repository/exercise-repository'
import UserExerciseRepository from '../../repository/userExercise-repository'

export const makeGetUserExercise = () => {
    const userRepository = new Repository()
    const exerciseRepository = new ExerciseRepository()
    const userExerciseRepository = new UserExerciseRepository()
  return new GetUserExerciseUseCase(userRepository, exerciseRepository, userExerciseRepository)
}
