import { UserMission } from '../../db/entities/domain/userMission'


export interface UserMissionsRepository {
  createUserMission(userUsername: string, missionId: string, progress: number, dateTimeStarted: Date): Promise<UserMission | undefined>
//   findAchievementsByUsername(userUsername: string): Promise<UserAchievement[] | undefined>
}