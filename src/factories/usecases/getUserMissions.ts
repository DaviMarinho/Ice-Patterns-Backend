import MissionRepository from '../../repository/mission-repository'
import UserRepository from '../../repository/user/repository'
import UserMissionRepository from '../../repository/userMission-repository'
import { GetUserMissionsUseCase } from '../../usecases/getUserMissions/use-case'

export const makeGetUserMissions = () => {
    const userRepository = new UserRepository()
    const userMissionRepository = new UserMissionRepository()
    const missionRepository = new MissionRepository()
  return new GetUserMissionsUseCase(userRepository, missionRepository, userMissionRepository)
}
