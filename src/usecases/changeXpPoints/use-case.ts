import { Repository } from '../../repository/port/user-repository'
import { ChangeXpPointsRequest } from './domain/changeXpPoints-request'
import { ChangeXpPointsResponse } from '../changeXpPoints/domain/changeXpPoints-response'
import { GetUserError } from '../get-user/errors/get-user-error'
import { UpdateXpPointsError } from './errors/updateXpPoints-error'
import { UseCase, UseCaseReponse } from '../domain/use-case'

export class ChangeXpPointsUseCase implements UseCase<ChangeXpPointsResponse> {
  constructor(
    private userRepository: Repository
  ) {}

  async execute(
    payload: ChangeXpPointsRequest
  ): Promise<UseCaseReponse<ChangeXpPointsResponse>> {
    try {
      let userFound = null

      if (payload.username) {
        userFound = await this.userRepository.findOneByUsername(payload.username)
      } else {
        return {
          isSuccess: false,
          error: new GetUserError()
        }
      }
      if (userFound) {

        const newXpTotal = userFound.qtXpTotal + payload.qtXp

        // TO-DO verify if upgraded level, so newXpOnLevel is ZERO
        const newXpOnLevel = userFound.qtXpOnLevel + payload.qtXp

        const updateResult = await this.userRepository.updateUserXpPoints(
          payload.username,
          newXpOnLevel,
          newXpTotal
        )

        if (!updateResult) {
          return {
            isSuccess: false,
            error: new UpdateXpPointsError()
          }
        }

        return { 
          isSuccess: true, 
          body: {
            currentXpOnLevel: newXpOnLevel,
            currentXpTotal: newXpTotal
          }
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
        error: new UpdateXpPointsError()
      }
    }
  }
}
