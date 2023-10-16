import { Repository } from '../../repository/port/user-repository'
import { ReceiveAchievementRequest } from './domain/receiveAchievement-request'
import { ReceiveAchievementResponse } from '../receiveAchievement/domain/receiveAchievement-response'
import { GetUserError } from '../get-user/errors/get-user-error'
import { GetAchievementError } from './errors/getAchievement-error'
import { ReceiveAchievementError } from './errors/receiveAchievement-error'
import { UseCase, UseCaseReponse } from '../domain/use-case'

export class ReceiveAchievementUseCase implements UseCase<ReceiveAchievementResponse> {
  constructor(
    private userRepository: Repository
  ) {}

  async execute(
    payload: ReceiveAchievementRequest
  ): Promise<UseCaseReponse<ReceiveAchievementResponse>> {
    try {
      let userFound = null

      if (payload.username) {
        userFound = await this.userRepository.findOneByUsername(payload.username)
      } else {
        return {
          isSuccess: false,
          error: new GetUserError()
        }
      }
      if (userFound) {
        if (payload.idAchievement) {
            achievementFound = await this.achievementRepository.findOneById(payload.idAchievement)
        } else {
            return {
                isSuccess: false,
                error: new GetAchievementError()
            }
        }    

        const userAchievement = await this.achievementRepository.receiveAchievement(
          payload.username,
          payload.idAchievement
        )

        if (!userAchievement) {
          return {
            isSuccess: false,
            error: new ReceiveAchievementError()
          }
        }

        return { 
            isSuccess: true, 
            body: {
            username: userFound.username,
            achievementName: achievementFound.name
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
        error: new ReceiveAchievementError()
      }
    }
  }
}