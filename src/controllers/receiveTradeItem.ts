import { GetUserError } from '../usecases/get-user/errors/get-user-error'
import { UpdateUserItemsError } from '../usecases/receiveTradeItem/errors/update-user-items-error'
import { OperationError } from '../usecases/receiveTradeItem/errors/operation-error'
import { ReceiveTradeItemResponse } from '../usecases/receiveTradeItem/domain/receiveTradeItem-response'
import { ReceiveTradeItemRequest } from '../usecases/receiveTradeItem/domain/receiveTradeItem-request'
import { ReceiveTradeItemUseCase } from '../usecases/receiveTradeItem/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'
import { QtError } from '../usecases/receiveTradeItem/errors/qt-error'

type HttpRequest =  ReceiveTradeItemRequest

type Model =
  | Error
  | ReceiveTradeItemResponse

export class ReceiveTradeItemController extends Controller {
  constructor(private readonly receiveTradeItem: ReceiveTradeItemUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.receiveTradeItem.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (
      !response.isSuccess &&
      response.error instanceof GetUserError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof UpdateUserItemsError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof OperationError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof QtError
    ) {
      return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
