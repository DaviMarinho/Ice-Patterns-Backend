import { GetSublevelContentsResponse } from '../usecases/getSublevelContents/domain/getSublevelContents-response'
import { GetSublevelError } from '../usecases/getSublevelContents/errors/getSublevel-error'
import { GetSublevelContentsError } from '../usecases/getSublevelContents/errors/getSublevelContents-error'
import { GetSublevelContentsUseCase } from '../usecases/getSublevelContents/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'

type HttpRequest = {
  sublevelId: string
}
type Model = Error | GetSublevelContentsResponse

export class GetSublevelContentsController extends Controller {
  constructor(private readonly getSublevelContents: GetSublevelContentsUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.getSublevelContents.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (!response.isSuccess && response.error instanceof GetSublevelContentsError) {
      return badRequest(response.error)
    } else if (!response.isSuccess && response.error instanceof GetSublevelError) {
        return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
