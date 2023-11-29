import { Repository } from '../../repository/port/user-repository'
import { UserAchievementsRepository } from '../../repository/port/userAchievement-repository'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { GetUserAchievementsResponse, DetailedAchievement } from './domain/getUserAchievements-response'
import { GetUserAchievementsError } from './errors/getUserAchievements-error'
import { GetUserError } from '../get-user/errors/get-user-error'
import { GetAchievementError } from '../receiveAchievement/errors/getAchievement-error'
import { AchievementsRepository } from '../../repository/port/achievement-repository'

export interface UserInfo {
    username: string
}

export class GetUserAchievementsUseCase implements UseCase<GetUserAchievementsResponse> {
    constructor(
      private userRepository: Repository,
      private achievementRepository: AchievementsRepository,
      private userAchievementRepository: UserAchievementsRepository
    ) {}

  async execute({ username }: UserInfo): Promise<UseCaseReponse<GetUserAchievementsResponse>> {
    try {
      let userFound = null

      if (username) {
        userFound = await this.userRepository.findOneByUsername(username)
      } else {
        return {
          isSuccess: false,
          error: new GetUserError()
        }
      }
      if (userFound) {

        const userAchievements = await this.userAchievementRepository.findAchievementsByUsername(username)
        
        if(userAchievements) {

          const userAchievementsFormatted: DetailedAchievement[] = []

          for (const achievement of userAchievements) {
            const achievementFound = await this.achievementRepository.findOneById(achievement.achievementId)

            if (!achievementFound) {
              return {
                isSuccess: false,
                error: new GetAchievementError()
              }
            }

            const achievementFormatted: DetailedAchievement = {
              achievement: achievementFound,
              dateTime: achievement.dateTime
            }

            userAchievementsFormatted.push(achievementFormatted)
            }
            
          return { 
              isSuccess: true,
              body: {
                achievements: userAchievementsFormatted
              }
          }
        } else {
            return {
              isSuccess: false,
              error: new GetUserAchievementsError()
            }
        }
      } else {
        return {
          isSuccess: false,
          error: new GetUserAchievementsError()
        }
      }
    } catch (error) {
      console.log(error)
      return {
        isSuccess: false,
        error: new GetUserAchievementsError()
      }
    }
  }
}
