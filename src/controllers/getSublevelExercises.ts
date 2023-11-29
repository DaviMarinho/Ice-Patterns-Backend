import { GetSublevelExercisesResponse } from '../usecases/getSublevelExercises/domain/getSublevelExercises-response'
import { GetSublevelError } from '../usecases/getSublevelContents/errors/getSublevel-error'
import { GetSublevelExercisesError } from '../usecases/getSublevelExercises/errors/getSublevelExercises-error'
import { GetSublevelExercisesUseCase } from '../usecases/getSublevelExercises/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'

type HttpRequest = {
  sublevelId: string
}
type Model = Error | GetSublevelExercisesResponse

export class GetSublevelExercisesController extends Controller {
  constructor(private readonly getSublevelExercises: GetSublevelExercisesUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.getSublevelExercises.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (!response.isSuccess && response.error instanceof GetSublevelExercisesError) {
      return badRequest(response.error)
    } else if (!response.isSuccess && response.error instanceof GetSublevelError) {
        return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
