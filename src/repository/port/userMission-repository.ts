import { UpdateResult } from 'typeorm'
import { UserMission } from '../../db/entities/userMission'


export interface UserMissionsRepository {
  createUserMission(userUsername: string, missionId: string, progress: number, dateTimeStarted: Date): Promise<UserMission | undefined>
  findMissionsByUsername(userUsername: string): Promise<UserMission[] | undefined>
  updateProgress(userUsername: string, missionId: string, progress: number): Promise<UpdateResult | undefined>
  completeMission(userUsername: string, missionId: string, dateTimeCompleted: Date, progress: number): Promise<UpdateResult | undefined>
  findOne(userUsername: string, missionId: string): Promise<UserMission | undefined>
}