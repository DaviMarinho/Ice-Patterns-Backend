import { dataSource } from '../db/config'
import { UserMission } from '../db/entities/userMission'
import { UserMissionsRepository } from './port/userMission-repository'


class UserMissionRepository implements UserMissionsRepository {
  private readonly userMissionRepository
  constructor() {
    this.userMissionRepository = dataSource.getRepository(UserMission)
  }

  async createUserMission(userUsername: string, missionId: string, progress: number, dateTimeStarted: Date): Promise<UserMission | undefined> {

    const userMission = this.userMissionRepository.create({
      userUsername,
      missionId,
      progress,
      dateTimeStarted
    })

    await this.userMissionRepository.save(userMission)
    return userMission
  }
}

export default UserMissionRepository