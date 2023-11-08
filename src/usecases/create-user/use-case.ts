import { Repository } from '../../repository/port/user-repository'
import { CreateUserRequest } from './domain/create-user-request'
import { CreateUserError } from './errors/create-user-error'
import { CreateUserResponse } from './domain/create-user-response'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { Encryptor } from '../../adapters/bcrypt-adapter'
import { InitialSublevelError } from './errors/initialSublevel-error'
import { SublevelsRepository } from '../../repository/port/sublevel-repository'

export class CreateUserUseCase implements UseCase<CreateUserResponse> {
  constructor(
    private encryptor: Encryptor,
    private userRepository: Repository,
    private sublevelRepository: SublevelsRepository,
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

        const initialSublevel = await this.sublevelRepository.findOneByNumbers(1, 1)

        if (!initialSublevel) {
            return {
              isSuccess: false,
              error: new InitialSublevelError()
            }
          }

        const userWithSublevel = await this.userRepository.updateUserSublevel(
          payload.username,
          initialSublevel,
          0
        )

        if (!userWithSublevel) {
          return {
            isSuccess: false,
            error: new InitialSublevelError()
          }
        }

        return { isSuccess: true, data: { email: user.email, username: user.username, sublevel: initialSublevel } }
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