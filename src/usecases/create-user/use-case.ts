import { Repository } from '../../repository/port/user-repository'
import { CreateUserRequest } from './domain/create-user-request'
import { CreateUserError } from './errors/create-user-error'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { CreateUserResponse } from './domain/create-user-response'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { Encryptor } from '../../adapters/bcrypt-adapter'
import { InitialSublevelError } from './errors/initialSublevel-error'
import { SublevelsRepository } from '../../repository/port/sublevel-repository'
import { MissionsRepository } from '../../repository/port/mission-repository'
import { UserMissionsRepository } from '../../repository/port/userMission-repository'
import { UserMission } from '../../db/entities/userMission'
import { UnlockMissionError } from '../levelUp/errors/unlockMission-error'


export class CreateUserUseCase implements UseCase<CreateUserResponse> {
  constructor(
    private encryptor: Encryptor,
    private userRepository: Repository,
    private sublevelRepository: SublevelsRepository,
    private missionRepository: MissionsRepository,
    private userMissionRepository: UserMissionsRepository,
  ) {}

  async execute(
    payload: CreateUserRequest
  ): Promise<UseCaseReponse<CreateUserResponse>> {
    try {
      const hashedPassword = this.encryptor.encrypt(payload.password)

      const userByUsername = await this.userRepository.findOneByUsername(
        payload.username
      )
      if (userByUsername !== undefined) {
        return {
          isSuccess: false,
          error: new UserAlreadyExistsError('Username já utilizado')
        }
      }

      const user = await this.userRepository.createUser({
        name: payload.name,
        password: hashedPassword,
        email: payload.email,
        username: payload.username
      })

      if (user) {

        // Initial sublevel
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

        // First mission
        const missionsToUnlock = await this.missionRepository.findByUnlockingLevel('1')
  
        let missionUnlocked = null
        if (missionsToUnlock && (missionsToUnlock.length > 0)) {
          if (missionsToUnlock) {
                missionUnlocked = await this.userMissionRepository.createUserMission(
                payload.username,
                missionsToUnlock[0].id,
                0,
                new Date(Date.now()))
              
              if (!missionUnlocked) {
                return {
                  isSuccess: false,
                  error: new UnlockMissionError()
                }
              }
          }
        }
        
        if (missionUnlocked) {
          return { isSuccess: true, data: { email: user.email, username: user.username, sublevel: initialSublevel, missionUnlocked: missionUnlocked} }
        } else {
          return { isSuccess: true, data: { email: user.email, username: user.username, sublevel: initialSublevel} }
        }
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