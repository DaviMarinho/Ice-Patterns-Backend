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

  async findAchievementsByUsername(userUsername: string): Promise<UserAchievement[] | undefined> {
    const userAchievements = await this.userAchievementRepository.findBy({
      userUsername
    })
    if (!userAchievements) {
      return undefined
    }
    return userAchievements
  }

  async findOne(userUsername: string, achievementId: string): Promise<UserAchievement | undefined> {
    const userAchievement = await this.userAchievementRepository.findOneBy({
      userUsername,
      achievementId
    })
    if (!userAchievement) {
      return undefined
    }

    return userAchievement
  }

}

export default UserAchievementRepository