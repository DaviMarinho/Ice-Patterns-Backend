import { CreateUserRequest } from '../usecases/create-user/domain/create-user-request'
import { CreateUserResponse } from '../usecases/create-user/domain/create-user-response'
import { CreateUserUseCase } from '../usecases/create-user/use-case'
import { Controller } from './domain/controller'
import { HttpResponse, serverError, success } from './helpers/http'

type HttpRequest = CreateUserRequest

type Model =
  | Error
  | CreateUserResponse

export class CreateUserController extends Controller {
  constructor(private readonly createUser: CreateUserUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.createUser.execute(params)
    if (response.isSuccess && response.data) {
      return success(response.data)
    } else {
      return serverError(response.error)
    }
  }
}