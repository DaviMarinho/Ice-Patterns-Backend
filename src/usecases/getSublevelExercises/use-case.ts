import { SublevelsRepository } from '../../repository/port/sublevel-repository'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { GetSublevelExercisesResponse } from './domain/getSublevelExercises-response'
import { GetSublevelExercisesError } from './errors/getSublevelExercises-error'
import { GetSublevelError } from '../getSublevelContents/errors/getSublevel-error'
import { ExercisesRepository } from '../../repository/port/exercise-repository'

export interface SublevelInfo {
    sublevelId: string
}

export class GetSublevelExercisesUseCase implements UseCase<GetSublevelExercisesResponse> {
    constructor(
        private sublevelRepository: SublevelsRepository,
        private exerciseRepository: ExercisesRepository,
    ) {}

  async execute({ sublevelId }: SublevelInfo): Promise<UseCaseReponse<GetSublevelExercisesResponse>> {
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

        const sublevelExercises = await this.exerciseRepository.findBySublevelId(sublevelId)
        
        if(sublevelExercises) {          
          return { 
              isSuccess: true,
              body: {
                exercises: sublevelExercises
              }
          }
        } else {
            return {
              isSuccess: false,
              error: new GetSublevelExercisesError()
            }
        }
      } else {
        return {
          isSuccess: false,
          error: new GetSublevelExercisesError()
        }
      }
    } catch (error) {
      console.log(error)
      return {
        isSuccess: false,
        error: new GetSublevelExercisesError()
      }
    }
  }
}
