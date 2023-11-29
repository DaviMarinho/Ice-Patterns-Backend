import UserRepository from '../../repository/user/repository'
import SublevelRepository from '../../repository/sublevel-repository'
import { LevelUpUseCase } from '../../usecases/levelUp/use-case'
import MissionRepository from '../../repository/mission-repository'
import UserMissionRepository from '../../repository/userMission-repository'

export const makeLevelUp = () => {
  const userRepository = new UserRepository()
  const sublevelRepository = new SublevelRepository()
  const missionRepository = new MissionRepository()
  const userMissionRepository = new UserMissionRepository()
  return new LevelUpUseCase(userRepository, sublevelRepository, missionRepository, userMissionRepository)
}
