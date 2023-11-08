import { GetUserError } from '../usecases/get-user/errors/get-user-error'
import { GetUserMissionsResponse } from '../usecases/getUserMissions/domain/getUserMissions-response'
import { GetUserMissionsError } from '../usecases/getUserMissions/errors/getUserMissions-error'
import { GetUserMissionsUseCase } from '../usecases/getUserMissions/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'

type HttpRequest = {
  username: string
}
type Model = Error | GetUserMissionsResponse

export class GetUserMissionsController extends Controller {
  constructor(private readonly getUserMissions: GetUserMissionsUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.getUserMissions.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (!response.isSuccess && response.error instanceof GetUserMissionsError) {
      return badRequest(response.error)
    } else if (!response.isSuccess && response.error instanceof GetUserError) {
        return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
