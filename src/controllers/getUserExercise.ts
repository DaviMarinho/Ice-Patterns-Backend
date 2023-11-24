import { GetUserExerciseResponse } from '../usecases/getUserExercise/domain/getUserExercise-response'
import { GetExerciseError } from '../usecases/getUserExercise/error/getExercise-error'
import { GetUserExerciseError } from '../usecases/getUserExercise/error/getUserExercise-error'
import { GetUserOrExerciseNotFoundError } from '../usecases/getUserExercise/error/getUserOrExerciseNotFound-error'
import { GetUserError } from '../usecases/get-user/errors/get-user-error'
import { GetUserExerciseUseCase } from '../usecases/getUserExercise/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'

type HttpRequest = {
  username: string
  exerciseId: string
}
type Model = Error | GetUserExerciseResponse

export class GetUserExerciseController extends Controller {
  constructor(private readonly getUserExercise: GetUserExerciseUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.getUserExercise.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (!response.isSuccess && response.error instanceof GetUserError) {
      return badRequest(response.error)
    } else if (!response.isSuccess && response.error instanceof GetExerciseError) {
        return badRequest(response.error)
    } else if (!response.isSuccess && response.error instanceof GetUserExerciseError) {
        return badRequest(response.error)
    } else if (!response.isSuccess && response.error instanceof GetUserOrExerciseNotFoundError) {
        return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
