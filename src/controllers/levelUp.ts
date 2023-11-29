import { GetUserError } from '../usecases/get-user/errors/get-user-error'
import { LevelUpError } from '../usecases/levelUp/errors/levelUp-error'
import { LevelUpResponse } from '../usecases/levelUp/domain/levelUp-response'
import { LevelUpRequest } from '../usecases/levelUp/domain/levelUp-request'
import { LevelUpUseCase } from '../usecases/levelUp/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'
import { LevelMaxError } from '../usecases/levelUp/errors/levelMax-error'

type HttpRequest =  LevelUpRequest

type Model =
  | Error
  | LevelUpResponse

export class LevelUpController extends Controller {
  constructor(private readonly levelUp: LevelUpUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.levelUp.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (
      !response.isSuccess &&
      response.error instanceof GetUserError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof LevelUpError
    ) {
      return badRequest(response.error)
    } else if (
        !response.isSuccess &&
        response.error instanceof LevelMaxError
      ) {
        return badRequest(response.error)
      } else {
      return serverError(response.error)
    }
  }
}
