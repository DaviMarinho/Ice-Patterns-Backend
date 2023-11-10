import { CreateUserRequest } from '../usecases/create-user/domain/create-user-request'
import { CreateUserResponse } from '../usecases/create-user/domain/create-user-response'
import { CreateUserError } from '../usecases/create-user/errors/create-user-error'
import { UserAlreadyExistsError } from '../usecases/create-user/errors/user-already-exists-error'
import { CreateUserUseCase } from '../usecases/create-user/use-case'
import { Controller } from './domain/controller'
import { HttpResponse, serverError, success, badRequest } from './helpers/http'

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
    } else if (!response.isSuccess && response.error instanceof CreateUserError) {
      return badRequest(response.error)
    } else if (!response.isSuccess && response.error instanceof UserAlreadyExistsError) {
      return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}