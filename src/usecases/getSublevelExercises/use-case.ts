import { SublevelsRepository } from '../../repository/port/sublevel-repository'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { DetailedExercise, GetSublevelExercisesResponse } from './domain/getSublevelExercises-response'
import { GetSublevelExercisesError } from './errors/getSublevelExercises-error'
import { GetSublevelError } from '../getSublevelContents/errors/getSublevel-error'
import { ExercisesRepository } from '../../repository/port/exercise-repository'
import { AlternativesRepository } from '../../repository/port/alternative-repository'
import { GetAlternativesError } from './errors/getAlternatives-error'

export interface SublevelInfo {
    sublevelId: string
}

export class GetSublevelExercisesUseCase implements UseCase<GetSublevelExercisesResponse> {
    constructor(
        private sublevelRepository: SublevelsRepository,
        private exerciseRepository: ExercisesRepository,
        private alternativeRepository: AlternativesRepository,
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
            const exercisesFormatted: DetailedExercise[] = []

          for (const exercise of sublevelExercises) {
            const alternatives = await this.alternativeRepository.findByExerciseId(exercise.id)

            if (!alternatives) {
              return {
                isSuccess: false,
                error: new GetAlternativesError()
              }
            }

            const missionFormatted: DetailedExercise = {
              exercise: exercise,
              alternatives: alternatives
            }

            exercisesFormatted.push(missionFormatted)
            }

          return { 
              isSuccess: true,
              body: {
                exercises: exercisesFormatted
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
