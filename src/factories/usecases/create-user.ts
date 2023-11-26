import { BcryptAdapter } from '../../adapters/bcrypt-adapter'
import MissionRepository from '../../repository/mission-repository'
import SublevelRepository from '../../repository/sublevel-repository'
import UserRepository from '../../repository/user/repository'
import UserMissionRepository from '../../repository/userMission-repository'
import { CreateUserUseCase } from '../../usecases/create-user/use-case'

export const makeCreateUser = () => {
  const encryptor = new BcryptAdapter()
  const userRepository = new UserRepository()
  const sublevelRepository = new SublevelRepository()
  const missionRepository = new MissionRepository()
  const userMissionRepository = new UserMissionRepository()
  return new CreateUserUseCase(encryptor, userRepository, sublevelRepository, missionRepository, userMissionRepository)
}