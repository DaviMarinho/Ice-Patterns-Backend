import { Repository } from '../../repository/port/user-repository'
import { LevelUpRequest } from './domain/levelUp-request'
import { LevelUpResponse } from './domain/levelUp-response'
import { GetUserError } from '../get-user/errors/get-user-error'
import { LevelUpError } from './errors/levelUp-error'
import { LevelMaxError } from './errors/levelMax-error'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { SublevelsRepository } from '../../repository/port/sublevel-repository'

export class LevelUpUseCase implements UseCase<LevelUpResponse> {
  constructor(
    private userRepository: Repository,
    private sublevelRepository: SublevelsRepository,

  ) {}

  async execute(
    payload: LevelUpRequest
  ): Promise<UseCaseReponse<LevelUpResponse>> {
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

        let numSublevel = userFound.sublevel.numSublevel
        let numLevel = userFound.sublevel.numLevel

        let nextNumSublevel
        let nextNumLevel

        if (numLevel == 7 && numSublevel == 4) {
            return {
                isSuccess: false,
                error: new LevelMaxError()
              }
        } else {
            if (numSublevel == 4) {
                nextNumLevel = numLevel + 1
                nextNumSublevel = 1
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
            let qtXpOnLevel = 0
    
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
    
            return { 
              isSuccess: true, 
              body: {
                username: userFound.username,
                name: userFound.name,
                email: userFound.email,
                qtXpOnLevel: qtXpOnLevel,
                qtXpTotal: userFound.qtXpTotal,
                idSublevel: nextSublevelFound.id,
                numSublevel: nextSublevelFound.numSublevel
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