import UserRepository from '../../repository/user/repository'
import UserMissionRepository from '../../repository/userMission-repository'
import { ActivateBoosterUseCase } from '../../usecases/activateBooster/use-case'

export const makeActivateBooster = () => {
  const userRepository = new UserRepository()
  const userMissionRepository = new UserMissionRepository()
  return new ActivateBoosterUseCase(userRepository, userMissionRepository)
}
