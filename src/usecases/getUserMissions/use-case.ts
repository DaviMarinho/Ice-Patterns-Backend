import { Repository } from '../../repository/port/user-repository'
import { UserMissionsRepository } from '../../repository/port/userMission-repository'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { GetUserMissionsResponse, DetailedMission } from './domain/getUserMissions-response'
import { GetUserMissionsError } from './errors/getUserMissions-error'
import { GetUserError } from '../get-user/errors/get-user-error'
import { MissionsRepository } from '../../repository/port/mission-repository'

export interface UserInfo {
    username: string
}

export class GetUserMissionsUseCase implements UseCase<GetUserMissionsResponse> {
    constructor(
      private userRepository: Repository,
      private missionRepository: MissionsRepository,
      private userMissionRepository: UserMissionsRepository
    ) {}

  async execute({ username }: UserInfo): Promise<UseCaseReponse<GetUserMissionsResponse>> {
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

        const userMissions = await this.userMissionRepository.findMissionsByUsername(username)
        
        if(userMissions) {

          const userMissionsFormatted: DetailedMission[] = []

          for (const mission of userMissions) {
            const missionFound = await this.missionRepository.findOneById(mission.missionId)

            if (!missionFound) {
              return {
                isSuccess: false,
                error: new GetUserMissionsError()
              }
            }

            const missionFormatted: DetailedMission = {
              mission: missionFound,
              progress: mission.progress,
              dateTimeStarted: mission.dateTimeStarted,
              dateTimeCompleted: mission.dateTimeCompleted
            }

            userMissionsFormatted.push(missionFormatted)
            }
            
          return { 
              isSuccess: true,
              body: {
                missions: userMissionsFormatted
              }
          }
        } else {
            return {
              isSuccess: false,
              error: new GetUserMissionsError()
            }
        }
      } else {
        return {
          isSuccess: false,
          error: new GetUserMissionsError()
        }
      }
    } catch (error) {
      console.log(error)
      return {
        isSuccess: false,
        error: new GetUserMissionsError()
      }
    }
  }
}
