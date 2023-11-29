import { GetUserError } from '../usecases/get-user/errors/get-user-error'
import { ChangeXpPointsResponse } from '../usecases/changeXpPoints/domain/changeXpPoints-response'
import { ChangeXpPointsRequest } from '../usecases/changeXpPoints/domain/changeXpPoints-request'
import { ChangeXpPointsUseCase } from '../usecases/changeXpPoints/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'
import { UpdateXpPointsError } from '../usecases/changeXpPoints/errors/updateXpPoints-error'

type HttpRequest =  ChangeXpPointsRequest

type Model =
  | Error
  | ChangeXpPointsResponse

export class ChangeXpPointsController extends Controller {
  constructor(private readonly changeXpPoints: ChangeXpPointsUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.changeXpPoints.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (
      !response.isSuccess &&
      response.error instanceof GetUserError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof UpdateXpPointsError
    ) {
      return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
