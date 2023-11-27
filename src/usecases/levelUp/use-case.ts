import { Repository } from '../../repository/port/user-repository'
import { LevelUpRequest } from './domain/levelUp-request'
import { LevelUpResponse } from './domain/levelUp-response'
import { GetUserError } from '../get-user/errors/get-user-error'
import { LevelUpError } from './errors/levelUp-error'
import { LevelMaxError } from './errors/levelMax-error'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { SublevelsRepository } from '../../repository/port/sublevel-repository'
import { MissionsRepository } from '../../repository/port/mission-repository'
import { UserMissionsRepository } from '../../repository/port/userMission-repository'
import { UserMission } from '../../db/entities/userMission'
import { UnlockMissionError } from './errors/unlockMission-error'
import { socketIO } from '../../main'

export class LevelUpUseCase implements UseCase<LevelUpResponse> {
  constructor(
    private userRepository: Repository,
    private sublevelRepository: SublevelsRepository,
    private missionRepository: MissionsRepository,
    private userMissionRepository: UserMissionsRepository,

  ) {}

  async execute(
    payload: LevelUpRequest
  ): Promise<UseCaseReponse<LevelUpResponse>> {
    try {
      let userFound = null
      // const socket = io();

      if (payload.username) {
        userFound = await this.userRepository.findOneByUsername(payload.username)
      } else {
        return {
          isSuccess: false,
          error: new GetUserError()
        }
      }
      if (userFound) {
        
        let numSublevel = userFound.sublevel.numSublevel
        let numLevel = userFound.sublevel.numLevel

        let nextNumSublevel
        let nextNumLevel

        let isLevelUpgrade = false

        if (numLevel == 2 && numSublevel == 4) {
            return {
                isSuccess: false,
                error: new LevelMaxError()
              }
        } else {
            if (numSublevel == 4) {

                // ACHIEVEMENTs
                if (numLevel == 1) {
                  socketIO.to(userFound.username).emit('conquista', '1')
                }
                if (numLevel == 2) {
                  socketIO.to(userFound.username).emit('conquista', '5')
                }

                nextNumLevel = numLevel + 1
                nextNumSublevel = 1
                isLevelUpgrade = true
            } else {
                nextNumSublevel = numSublevel + 1
                nextNumLevel = numLevel
            }

            let nextSublevelFound = null
    
            nextSublevelFound = await this.sublevelRepository.findOneByNumbers(nextNumSublevel, nextNumLevel)

            if (!nextSublevelFound) {
                return {
                  isSuccess: false,
                  error: new LevelUpError()
                }
              }

            let qtXpOnLevel = userFound.qtXpOnLevel
            if (isLevelUpgrade) {
              qtXpOnLevel = 0
            }
    
            // update user level
            const updateResult = await this.userRepository.updateUserSublevel(
              payload.username,
              nextSublevelFound,
              qtXpOnLevel
            )
    
            if (!updateResult) {
              return {
                isSuccess: false,
                error: new LevelUpError()
              }
            }


            // check missions to unlock
            const missionsToUnlock = await this.missionRepository.findByUnlockingLevel(nextSublevelFound.id)
  
            let missionsUnlocked: UserMission[] = []
    
            if (missionsToUnlock) {
    

              for (const missionToUnlock of missionsToUnlock) {
                const missionUnlocked = await this.userMissionRepository.createUserMission(
                  payload.username,
                  missionToUnlock.id,
                  0,
                  new Date(Date.now()))
                
                if (!missionUnlocked) {
                  return {
                    isSuccess: false,
                    error: new UnlockMissionError()
                  }
                }

                missionsUnlocked.push(missionUnlocked)
              }


            }

            return { 
              isSuccess: true, 
              body: {
                username: userFound.username,
                name: userFound.name,
                email: userFound.email,
                qtXpOnLevel: qtXpOnLevel,
                qtXpTotal: userFound.qtXpTotal,
                idSublevel: nextSublevelFound.id,
                numSublevel: nextSublevelFound.numSublevel,
                numLevel: nextSublevelFound.numLevel,
                missionsUnlocked: missionsToUnlock
              }
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
        error: new LevelUpError()
      }
    }
  }
}