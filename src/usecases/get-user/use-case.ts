import { Repository } from '../../repository/port/user-repository'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { GetUserResponse } from './domain/get-user-response'
import { GetUserError } from './errors/get-user-error'

export interface FindUser {
    userEmail: string
}

export class GetUserUseCase implements UseCase<GetUserResponse> {
  constructor(private userRepository: Repository) {}

  async execute({ userEmail }: FindUser): Promise<UseCaseReponse<GetUserResponse>> {
    try {
      let userFound = null

      if (userEmail) {
        userFound = await this.userRepository.findOneByEmail(userEmail)
      } else {
        return {
          isSuccess: false,
          error: new GetUserError()
        }
      }
      if (userFound) {
        return { 
          isSuccess: true,
          body: userFound
        }
      } else {
        return {
          isSuccess: false,
          error: new GetUserError()
        }
      }
    } catch (error) {
      console.log(error)
      return {
        isSuccess: false,
        error: new GetUserError()
      }
    }
  }
}
