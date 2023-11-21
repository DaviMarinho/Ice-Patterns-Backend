import { Repository } from '../../repository/port/user-repository'
import { UserExercisesRepository } from '../../repository/port/userExercise-repository'
import { ExercisesRepository } from '../../repository/port/exercise-repository'
import { SolveExercisesRequest } from './domain/solveExercises-request'
import { SolveExercisesResponse } from '../solveExercises/domain/solveExercises-response'
import { GetUserError } from '../get-user/errors/get-user-error'
import { GetExerciseError } from './errors/getExercise-error'
import { SolveExerciseError } from './errors/solveExercise-error'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { UserExercise } from '../../db/entities/userExercise'

export class SolveExercisesUseCase implements UseCase<SolveExercisesResponse> {
  constructor(
    private userRepository: Repository,
    private exerciseRepository: ExercisesRepository,
    private userExerciseRepository: UserExercisesRepository
  ) {}

  async execute(
    payload: SolveExercisesRequest
  ): Promise<UseCaseReponse<SolveExercisesResponse>> {
    try {
      let userFound = null
      const userExercisesRelated: UserExercise[] = []

      if (payload.username) {
        userFound = await this.userRepository.findOneByUsername(payload.username)
      } else {
        return {
          isSuccess: false,
          error: new GetUserError()
        }
      }
      if (userFound) {
        if (payload.exercises && payload.exercises.length != 0) {


            for (const exercise of payload.exercises) {
                let exerciseFound = null
                let userExerciseFound = null

                exerciseFound = await this.exerciseRepository.findOneById(exercise.exerciseId)
                if (!exerciseFound) {
                    return {
                        isSuccess: false,
                        error: new GetExerciseError()
                    }
                }

                let timeNow
                let qtAttempts
                let qtRights

                userExerciseFound = await this.userExerciseRepository.findOneByIds(payload.username, exercise.exerciseId)
                if (!userExerciseFound) {
                    timeNow = Date.now()
                    qtAttempts = 1
                    if (exercise.isCorrect) {
                        qtRights = 1
                    } else {
                        qtRights = 0
                    }

                    const newUserExercise = await this.userExerciseRepository.createUserExercise(
                        payload.username,
                        exercise.exerciseId,
                        new Date(timeNow),
                        qtAttempts,
                        qtRights
                        )
                    if (!newUserExercise) {
                        return {
                            isSuccess: false,
                            error: new SolveExerciseError()
                        }
                    }

                    userExercisesRelated.push(newUserExercise)
                } else {
                    timeNow = Date.now()
                    qtAttempts = userExerciseFound.qtAttempts + 1
                    if (exercise.isCorrect) {
                        qtRights = userExerciseFound.qtRights + 1
                    } else {
                        qtRights = userExerciseFound.qtRights
                    }

                    const updatedUserExercise = await this.userExerciseRepository.updateUserExercise(
                        payload.username,
                        exercise.exerciseId,
                        new Date(timeNow),
                        qtAttempts,
                        qtRights
                        )
                    if (!updatedUserExercise || updatedUserExercise.affected != 1) {
                        return {
                            isSuccess: false,
                            error: new SolveExerciseError()
                        }
                    }

                    const updatedFound = await this.userExerciseRepository.findOneByIds(payload.username, exercise.exerciseId)
                    if (!updatedFound) {
                        return {
                            isSuccess: false,
                            error: new SolveExerciseError()
                        }
                    }

                    userExercisesRelated.push(updatedFound)
                }
            }
        } else {
            return {
                isSuccess: false,
                error: new GetExerciseError()
            }
        }    

        return { 
            isSuccess: true, 
            body: {
            userExercises: userExercisesRelated
            }
        }
      } else {
        return {
          isSuccess: false,
          error: new GetUserError()
        }
      }

    } catch (error) {
      console.log(error)
      return {
        isSuccess: false,
        error: new SolveExerciseError()
      }
    }
  }
}