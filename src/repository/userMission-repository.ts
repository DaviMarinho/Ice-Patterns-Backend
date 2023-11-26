import { UpdateResult } from 'typeorm'
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

  async findMissionsByUsername(userUsername: string): Promise<UserMission[] | undefined> {
    const userMissions = await this.userMissionRepository.findBy({
      userUsername
    })
    if (!userMissions) {
      return undefined
    }
    return userMissions
  }

  async updateProgress(userUsername: string, missionId: string, progress: number): Promise<UpdateResult | undefined> {
    const result = await this.userMissionRepository.update({
        userUsername,
        missionId,
    }, {
        progress
    })

    return result
  }

  async completeMission(userUsername: string, missionId: string, dateTimeCompleted: Date, progress: number): Promise<UpdateResult | undefined> {
    const result = await this.userMissionRepository.update({
        userUsername,
        missionId,
    }, {
        progress,
        dateTimeCompleted
    })

    return result
  }

}

export default UserMissionRepository