import { UserAchievement } from '../../db/entities/userAchievement'

export interface UserAchievementsRepository {
  createUserAchievement(userUsername: string, achievementId: string, dateTime: Date): Promise<UserAchievement | undefined>
  findAchievementsByUsername(userUsername: string): Promise<UserAchievement[] | undefined>
  findOne(userUsername: string, achievementId: string): Promise<UserAchievement | undefined>
}