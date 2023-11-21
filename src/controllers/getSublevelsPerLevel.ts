import { GetSublevelsPerLevelResponse } from '../usecases/getSublevelsPerLevel/domain/getSublevelsPerLevel-response'
import { GetSublevelsPerLevelError } from '../usecases/getSublevelsPerLevel/errors/getSublevelsPerLevel-error'
import { GetSublevelsPerLevelUseCase } from '../usecases/getSublevelsPerLevel/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'

type HttpRequest = {
  levelId: number
}
type Model = Error | GetSublevelsPerLevelResponse

export class GetSublevelsPerLevelController extends Controller {
  constructor(private readonly getSublevelsPerLevel: GetSublevelsPerLevelUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.getSublevelsPerLevel.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (!response.isSuccess && response.error instanceof GetSublevelsPerLevelError) {
      return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
