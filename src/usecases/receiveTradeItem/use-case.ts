import { Repository } from '../../repository/port/user-repository'
import { ReceiveTradeItemRequest } from './domain/receiveTradeItem-request'
import { ReceiveTradeItemResponse } from '../receiveTradeItem/domain/receiveTradeItem-response'
import { GetUserError } from '../get-user/errors/get-user-error'
import { UpdateUserItemsError } from './errors/update-user-items-error'
import { OperationError } from './errors/operation-error'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { QtError } from './errors/qt-error'

export class ReceiveTradeItemUseCase implements UseCase<ReceiveTradeItemResponse> {
  constructor(
    private userRepository: Repository
  ) {}

  async execute(
    payload: ReceiveTradeItemRequest
  ): Promise<UseCaseReponse<ReceiveTradeItemResponse>> {
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

        let newQtCube 
        let newQtEnergy
        let newQtBooster

        let diffQtCube = 0
        let diffQtEnergy = 0
        let diffQtBooster = 0

        if(payload?.qtCube) {
          if ((payload?.qtCube > userFound.qtCube) && !payload.isReceiving) {
            return {
              isSuccess: false,
              error: new QtError('cubos')
            }
          }
          diffQtCube = payload.qtCube
        }
        if(payload?.qtEnergy) {
          if ((payload?.qtEnergy > userFound.qtEnergy) && !payload.isReceiving) {
            return {
              isSuccess: false,
              error: new QtError('energia')
            }
          }
          diffQtEnergy = payload.qtEnergy
        }
        if(payload?.qtBooster) {
          if ((payload?.qtBooster > userFound.qtBooster) && !payload.isReceiving) {
            return {
              isSuccess: false,
              error: new QtError('impulsinonador')
            }
          }
          diffQtBooster = payload.qtBooster
        }
      

        if (payload.isReceiving != undefined) {
          if (payload.isReceiving) {
            newQtCube = userFound.qtCube + diffQtCube
            newQtEnergy = userFound.qtEnergy + diffQtEnergy
            newQtBooster = userFound.qtBooster + diffQtBooster
          } else {
            newQtCube = userFound.qtCube - diffQtCube
            newQtEnergy = userFound.qtEnergy - diffQtEnergy
            newQtBooster = userFound.qtBooster - diffQtBooster
          }
        } else {
          return {
            isSuccess: false,
            error: new OperationError()
          }
        }
      

        const updateResult = await this.userRepository.updateUserItemQuantity(
          payload.username,
          newQtCube,
          newQtEnergy,
          newQtBooster
        )

        if (!updateResult) {
          return {
            isSuccess: false,
            error: new UpdateUserItemsError()
          }
        }

        return { 
          isSuccess: true, 
          body: {
            currentQtCube: newQtCube,
            currentQtEnergy: newQtEnergy,
            currentQtBooster: newQtBooster
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
        error: new UpdateUserItemsError()
      }
    }
  }
}