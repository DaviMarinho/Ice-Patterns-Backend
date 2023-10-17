import { dataSource } from '../db/config'
import { UserAchievement } from '../db/entities/userAchievement'
import { UserAchievementsRepository } from './port/userAchievement-repository'


class UserAchievementRepository implements UserAchievementsRepository {
  private readonly userAchievementRepository
  constructor() {
    this.userAchievementRepository = dataSource.getRepository(UserAchievement)
  }

  async createUserAchievement(userUsername: string, achievementId: string, dateTime: Date): Promise<UserAchievement | undefined> {

    const userAchievement = this.userAchievementRepository.create({
      userUsername,
      achievementId,
      dateTime,
    })

    await this.userAchievementRepository.save(userAchievement)
    return userAchievement
  }
}

export default UserAchievementRepository