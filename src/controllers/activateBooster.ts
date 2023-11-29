import { GetUserError } from '../usecases/get-user/errors/get-user-error'
import { ActivateBoosterRequest } from '../usecases/activateBooster/domain/activateBooster-request'
import { ActivateBoosterResponse } from '../usecases/activateBooster/domain/activateBooster-response'
import { ActivateBoosterUseCase } from '../usecases/activateBooster/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'
import { CheckMissionError } from '../usecases/solveExercises/errors/checkMission-error'
import { NotEnoughBoosterError } from '../usecases/activateBooster/errors/notEnoughBooster-error'
import { ActivateBoosterError } from '../usecases/activateBooster/errors/activateBooster-error'

type HttpRequest =  ActivateBoosterRequest

type Model =
  | Error
  | ActivateBoosterResponse

export class ActivateBoosterController extends Controller {
  constructor(private readonly activateBooster: ActivateBoosterUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.activateBooster.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (
      !response.isSuccess &&
      response.error instanceof GetUserError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof ActivateBoosterError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof NotEnoughBoosterError
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
