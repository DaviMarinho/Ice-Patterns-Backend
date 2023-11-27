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
import { UserMissionsRepository } from '../../repository/port/userMission-repository'
import { CheckMissionError } from './errors/checkMission-error'

type response = {
  isSuccess: boolean,
  error?: Error
}

export class SolveExercisesUseCase implements UseCase<SolveExercisesResponse> {
  constructor(
    private userRepository: Repository,
    private exerciseRepository: ExercisesRepository,
    private userExerciseRepository: UserExercisesRepository,
    private userMissionRepository: UserMissionsRepository,
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

        let response = null
        
        response = await checkNumberOfSolvedExercises(payload.username, this.userExerciseRepository, this.userMissionRepository)
        if (!response?.isSuccess) {
          return {
            isSuccess: false,
            error: new CheckMissionError()
          }
        }

        response = await checkMissionDesafio(payload.username, payload.exercises[0].exerciseId, this.exerciseRepository, this.userMissionRepository)
        if (!response?.isSuccess) {
          return {
            isSuccess: false,
            error: new CheckMissionError()
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

export async function checkNumberOfSolvedExercises(username: string, userExerciseRepository: UserExercisesRepository, userMissionRepository: UserMissionsRepository): Promise<response | undefined> {

  try {
    console.log(`checking ${username}'s number of solved exercises`)
    const userExercises = await userExerciseRepository.findByUser(username)
    if (!userExercises) {
        return {
            isSuccess: false,
            error: new CheckMissionError()
        }
    }

      const missionId = '1'
      let progress = 0
      let updatedMission = null

      const numOfExercises = userExercises.length
      if (numOfExercises <= 5) {

        if (numOfExercises == 5) {
          // complete mission
          progress = 100
          const dateTimeCompleted = new Date(Date.now())
          updatedMission = await userMissionRepository.completeMission(username, missionId, dateTimeCompleted, progress)
          if (!updatedMission) {
            return {
              isSuccess: false,
              error: new CheckMissionError()
            }
          }
          // send socket data
          // socketIO.to('user.username').emit('missao', '1')
        } else {
          switch (numOfExercises) {
            case 1:
              // update mission progress to 20%
              progress = 20
              break;
            case 2:
              // update mission progress to 40%
              progress = 40
              break;
            case 3:
              // update mission progress to 60%
              progress = 60
              break;
            case 4:
              // update mission progress to 80%
              progress = 80
              break;
            default:
              break;
          }

          console.log(`updating ${username}'s mission to progress ${progress}`)

          updatedMission = await userMissionRepository.updateProgress(username, missionId, progress)
          if (!updatedMission) {
            return {
                isSuccess: false,
                error: new CheckMissionError()
            }
          }
        }
        
        return {
          isSuccess: true,
        }

      }
  } catch (error) {
    return {
      isSuccess: false,
      error: new CheckMissionError()
    }
  }
  
}

export async function checkMissionDesafio(username: string, exampleExerciseId: string, exerciseRepository: ExercisesRepository, userMissionRepository: UserMissionsRepository): Promise<response | undefined> {

  console.log(`checking ${username}'s desafio mission`)
  try {
    const exercises = await exerciseRepository.findBySublevelId('4')
    if (!exercises || exercises.length == 0) {
      return {
        isSuccess: false,
        error: new CheckMissionError()
      }
    }

    let isDesafio = false
    for (const exercise of exercises) {
      if (exercise.id == exampleExerciseId) {
        isDesafio =  true
        break;
      }
    }

    if (isDesafio) {
      const mission = await userMissionRepository.findOne(username, '3')
      if (!mission) {
        return {
          isSuccess: true,
        }
      } else {
        const progress = 100
        const dateTimeCompleted = new Date(Date.now())
        const missionId = mission.missionId
  
        const updatedMission = await userMissionRepository.completeMission(username, missionId, dateTimeCompleted, progress)
        if (!updatedMission) {
          return {
            isSuccess: false,
            error: new CheckMissionError()
          }
        }
  
        return {
          isSuccess: true,
        }
      } 
    }

    return {
      isSuccess: true,
    }

  } catch (error) {
    return {
      isSuccess: false,
      error: new CheckMissionError()
    }
  }
  
}