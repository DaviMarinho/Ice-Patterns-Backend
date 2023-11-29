import { SublevelsRepository } from '../../repository/port/sublevel-repository'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { GetSublevelContentsResponse } from './domain/getSublevelContents-response'
import { GetSublevelContentsError } from './errors/getSublevelContents-error'
import { GetSublevelError } from './errors/getSublevel-error'
import { ContentsRepository } from '../../repository/port/content-repository'

export interface SublevelInfo {
    sublevelId: string
}

export class GetSublevelContentsUseCase implements UseCase<GetSublevelContentsResponse> {
    constructor(
        private sublevelRepository: SublevelsRepository,
        private contentRepository: ContentsRepository,
    ) {}

  async execute({ sublevelId }: SublevelInfo): Promise<UseCaseReponse<GetSublevelContentsResponse>> {
    try {
      let sublevelFound = null

      if (sublevelId) {
        sublevelFound = await this.sublevelRepository.findOneById(sublevelId)
      } else {
        return {
          isSuccess: false,
          error: new GetSublevelError()
        }
      }
      if (sublevelFound) {

        const sublevelContents = await this.contentRepository.findBySublevelId(sublevelId)
        
        if(sublevelContents) {          
          return { 
              isSuccess: true,
              body: {
                contents: sublevelContents
              }
          }
        } else {
            return {
              isSuccess: false,
              error: new GetSublevelContentsError()
            }
        }
      } else {
        return {
          isSuccess: false,
          error: new GetSublevelContentsError()
        }
      }
    } catch (error) {
      console.log(error)
      return {
        isSuccess: false,
        error: new GetSublevelContentsError()
      }
    }
  }
}
