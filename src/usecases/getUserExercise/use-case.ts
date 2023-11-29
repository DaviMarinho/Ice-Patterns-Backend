import { Repository } from '../../repository/port/user-repository'
import { UserExercisesRepository } from '../../repository/port/userExercise-repository'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { GetUserExerciseResponse } from './domain/getUserExercise-response'
import { GetUserExerciseError } from './error/getUserExercise-error'
import { GetUserOrExerciseNotFoundError } from './error/getUserOrExerciseNotFound-error'
import { GetUserError } from '../get-user/errors/get-user-error'
import { GetExerciseError } from './error/getExercise-error'
import { ExercisesRepository } from '../../repository/port/exercise-repository'

export interface UserExerciseInfo {
    username: string
    exerciseId: string
}

export class GetUserExerciseUseCase implements UseCase<GetUserExerciseResponse> {
    constructor(
      private userRepository: Repository,
      private exerciseRepository: ExercisesRepository,
      private userExerciseRepository: UserExercisesRepository
    ) {}

  async execute({ username, exerciseId }: UserExerciseInfo): Promise<UseCaseReponse<GetUserExerciseResponse>> {
    try {
      let userFound = null
      let exerciseFound = null

      if (username) {
        userFound = await this.userRepository.findOneByUsername(username)
      } else {
        return {
          isSuccess: false,
          error: new GetUserError()
        }
      }

      if (exerciseId) {
        exerciseFound = await this.exerciseRepository.findOneById(exerciseId)
      } else {
        return {
          isSuccess: false,
          error: new GetExerciseError()
        }
      }

      if (userFound && exerciseFound) {

        const userExercise = await this.userExerciseRepository.findOneByIds(username, exerciseId)
        
        if(userExercise && userExercise.qtAttempts > 0) {
            return {
            isSuccess: true,
            body: {
                exerciseDone: true
                }
            }
        } else {
            return {
              isSuccess: true,
              body: {
                exerciseDone: false
              }
            }
        }
      } else {
        return {
          isSuccess: false,
          error: new GetUserOrExerciseNotFoundError()
        }
      }
    } catch (error) {
      console.log(error)
      return {
        isSuccess: false,
        error: new GetUserExerciseError()
      }
    }
  }
}
