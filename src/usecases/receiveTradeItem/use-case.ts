import { Repository } from '../../repository/port/user-repository'
import { CreateUserRequest } from '../create-user/domain/create-user-request'
import { CreateUserError } from '../create-user/errors/create-user-error'
import { CreateUserResponse } from '../create-user/domain/create-user-response'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { Encryptor } from '../../adapters/bcrypt-adapter'

export class ReceiveTradeItemUseCase implements UseCase<CreateUserResponse> {
  constructor(
    private encryptor: Encryptor,
    private userRepository: Repository
  ) {}

  async execute(
    payload: CreateUserRequest
  ): Promise<UseCaseReponse<CreateUserResponse>> {
    try {
      const hashedPassword = this.encryptor.encrypt(payload.password)

      const user = await this.userRepository.createUser({
        name: payload.name,
        password: hashedPassword,
        email: payload.email,
        username: payload.username
      })

      if (user) {
        return { isSuccess: true, data: { email: user.email, username: user.username } }
      } else {
        return {
          isSuccess: false,
          error: new CreateUserError()
        }
      }
    } catch (error) {
      console.log(error)
      return {
        isSuccess: false,
        error: new CreateUserError()
      }
    }
  }
}