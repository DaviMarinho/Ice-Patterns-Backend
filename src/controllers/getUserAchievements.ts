import { GetUserError } from '../usecases/get-user/errors/get-user-error'
import { GetUserAchievementsResponse } from '../usecases/getUserAchievements/domain/getUserAchievements-response'
import { GetUserAchievementsError } from '../usecases/getUserAchievements/errors/getUserAchievements-error'
import { GetUserAchievementsUseCase } from '../usecases/getUserAchievements/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'

type HttpRequest = {
  username: string
}
type Model = Error | GetUserAchievementsResponse

export class GetUserAchievementsController extends Controller {
  constructor(private readonly getUserAchievements: GetUserAchievementsUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.getUserAchievements.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (!response.isSuccess && response.error instanceof GetUserAchievementsError) {
      return badRequest(response.error)
    } else if (!response.isSuccess && response.error instanceof GetUserError) {
        return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
