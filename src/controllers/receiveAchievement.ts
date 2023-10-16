import { GetUserError } from '../usecases/get-user/errors/get-user-error'
import { GetAchievementError } from '../usecases/receiveAchievement/errors/getAchievement-error'
import { ReceiveAchievementError } from '../usecases/receiveAchievement/errors/receiveAchievement-error'
import { ReceiveAchievementRequest } from '../usecases/receiveAchievement/domain/receiveAchievement-request'
import { ReceiveAchievementResponse } from '../usecases/receiveAchievement/domain/receiveAchievement-response'
import { ReceiveAchievementUseCase } from '../usecases/receiveAchievement/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'

type HttpRequest =  ReceiveAchievementRequest

type Model =
  | Error
  | ReceiveAchievementResponse

export class ReceiveAchievementController extends Controller {
  constructor(private readonly receiveAchievement: ReceiveAchievementUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.receiveAchievement.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (
      !response.isSuccess &&
      response.error instanceof GetUserError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof GetAchievementError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof ReceiveAchievementError
    ) {
      return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
