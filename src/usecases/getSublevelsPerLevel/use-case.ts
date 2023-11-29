import { SublevelsRepository } from '../../repository/port/sublevel-repository'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { GetSublevelsPerLevelResponse } from './domain/getSublevelsPerLevel-response'
import { GetSublevelsPerLevelError } from './errors/getSublevelsPerLevel-error'

export interface SublevelInfo {
    levelId: number
}

export class GetSublevelsPerLevelUseCase implements UseCase<GetSublevelsPerLevelResponse> {
    constructor(
        private sublevelRepository: SublevelsRepository,
    ) {}

  async execute({ levelId }: SublevelInfo): Promise<UseCaseReponse<GetSublevelsPerLevelResponse>> {
    try {
      if (levelId) {
        const sublevelsPerLevel = await this.sublevelRepository.findByLevelId(levelId)
        
        if(sublevelsPerLevel) {     
          return { 
              isSuccess: true,
              body: {
                sublevels: sublevelsPerLevel
              }
          }
        } else {
            return {
              isSuccess: false,
              error: new GetSublevelsPerLevelError()
            }
        }
      } else {
        return {
          isSuccess: false,
          error: new GetSublevelsPerLevelError()
        }
      }
    } catch (error) {
      console.log(error)
      return {
        isSuccess: false,
        error: new GetSublevelsPerLevelError()
      }
    }
  }
}
