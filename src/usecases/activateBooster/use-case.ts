import { Repository } from '../../repository/port/user-repository'
import { UserAchievementsRepository } from '../../repository/port/userAchievement-repository'
import { AchievementsRepository } from '../../repository/port/achievement-repository'
import { ActivateBoosterRequest } from './domain/activateBooster-request'
import { ActivateBoosterResponse } from '../activateBooster/domain/activateBooster-response'
import { GetUserError } from '../get-user/errors/get-user-error'
import { ActivateBoosterError } from './errors/activateBooster-error'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { NotEnoughBoosterError } from './errors/notEnoughBooster-error'
import { CheckMissionError } from '../solveExercises/errors/checkMission-error'
import { UserMissionsRepository } from '../../repository/port/userMission-repository'
import { socketIO } from '../../main'

type response = {
  isSuccess: boolean,
  error?: Error
}
export class ActivateBoosterUseCase implements UseCase<ActivateBoosterResponse> {
  constructor(
    private userRepository: Repository,
    private userMissionRepository: UserMissionsRepository,
  ) {}

  async execute(
    payload: ActivateBoosterRequest
  ): Promise<UseCaseReponse<ActivateBoosterResponse>> {
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

        if(userFound.qtBooster < 1) {
            return {
                isSuccess: false,
                error: new NotEnoughBoosterError()
              }
        }

        const updatedUserBooster = await this.userRepository.activateBooster(
            userFound.username,
            true,
            new Date(Date.now()),
          )
        if (!updatedUserBooster) {
            return {
              isSuccess: false,
              error: new ActivateBoosterError()
            }
          }

        startBoosterCountDown(900, userFound.username, this.userRepository)

        const updatedUser = await this.userRepository.updateUserItemQuantity(
            userFound.username,
            userFound.qtCube,
            userFound.qtEnergy,
            (userFound.qtBooster - 1)
          )
          if (!updatedUser) {
            return {
              isSuccess: false,
              error: new ActivateBoosterError()
            }
          }

          const response = await checkBoosterMission(payload.username, this.userMissionRepository)
          if (!response?.isSuccess) {
            return {
              isSuccess: false,
              error: new CheckMissionError()
            }
          }

        return { 
            isSuccess: true, 
            body: {
            username: userFound.username,
            qtBooster: userFound.qtBooster - 1
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
        error: new ActivateBoosterError()
      }
    }
  }
}


export async function startBoosterCountDown(duration: number, username: string, userRepository: Repository) {
    console.log(`Contagem regressiva iniciada para ${duration} segundos.`);

    await countdownTimer(duration);

    console.log('Contagem regressiva concluída!');
    // chamar um deactivateBooster
    const updatedUser = await userRepository.activateBooster(
        username,
        false,
        undefined,
        new Date(Date.now()),
      )
      if (!updatedUser) {
        return {
          isSuccess: false,
          error: new ActivateBoosterError()
        }
      }
    // enviar um socket emit pro front
    socketIO.to(username).emit('booster desativar')
}

function countdownTimer(duration: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        duration--;
        console.log(`${duration} segundos.`);
        if (duration <= 0) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
}

export async function checkBoosterMission(username: string, userMissionRepository: UserMissionsRepository): Promise<response | undefined> {
  
  console.log(`checking ${username}'s activate booster mission`)
  
  try {
    const mission = await userMissionRepository.findOne(username, '2')
    if (!mission) {
      return {
        isSuccess: true,
      }
    } else {
      if (mission.progress != 100) {
        const progress = 100
        const dateTimeCompleted = new Date(Date.now())
        const missionId = mission.missionId

        const updatedMission = await userMissionRepository.completeMission(username, missionId, dateTimeCompleted, progress)
        if (!updatedMission) {
          return {
            isSuccess: false,
            error: new CheckMissionError()
          }
        }
        socketIO.to(username).emit('missao', {cubeReward: 150})
      }
      return {
        isSuccess: true,
      }
    }
  } catch (error) {
    return {
      isSuccess: false,
      error: new CheckMissionError()
    }
  }
  
}
  