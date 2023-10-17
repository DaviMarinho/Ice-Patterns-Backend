import { UserAchievement } from '../../db/entities/domain/userAchievement'
import { Achievement } from '../../db/entities/achievement'
import { User } from '../../db/entities/user'

export interface UserAchievementsRepository {
  createUserAchievement(userUsername: string, achievementId: string, dateTime: Date): Promise<UserAchievement | undefined>

//   findToLogin(email: string): Promise<User | undefined>
//   findOneByEmail(email: string): Promise<User | undefined>
//   findOneByUsername(username: string): Promise<User | undefined>
//   updateUserItemQuantity(username: string, qtCube: number, qtEnergy: number, qtBooster: number): Promise<UpdateResult | undefined>
}