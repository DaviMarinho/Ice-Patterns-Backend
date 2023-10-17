import { UserAchievement } from '../../db/entities/domain/userAchievement'
import { Achievement } from '../../db/entities/achievement'
import { User } from '../../db/entities/user'

export interface UserAchievementsRepository {
  createUserAchievement(userUsername: string, achievementId: string, dateTime: Date): Promise<UserAchievement | undefined>
  findAchievementsByUsername(userUsername: string): Promise<UserAchievement[] | undefined>
}