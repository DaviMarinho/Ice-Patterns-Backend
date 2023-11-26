import { GetUserError } from '../usecases/get-user/errors/get-user-error'
import { GetExerciseError } from '../usecases/solveExercises/errors/getExercise-error'
import { SolveExerciseError } from '../usecases/solveExercises/errors/solveExercise-error'
import { SolveExercisesRequest } from '../usecases/solveExercises/domain/solveExercises-request'
import { SolveExercisesResponse } from '../usecases/solveExercises/domain/solveExercises-response'
import { SolveExercisesUseCase } from '../usecases/solveExercises/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'
import { CheckMissionError } from '../usecases/solveExercises/errors/checkMission-error'

type HttpRequest =  SolveExercisesRequest

type Model =
  | Error
  | SolveExercisesResponse

export class SolveExercisesController extends Controller {
  constructor(private readonly solveExercises: SolveExercisesUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.solveExercises.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (
      !response.isSuccess &&
      response.error instanceof GetUserError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof GetExerciseError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof SolveExerciseError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof CheckMissionError
    ) {
      return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
