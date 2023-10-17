import { dataSource } from '../db/config'
import { Achievement } from '../db/entities/achievement'
import { AchievementsRepository } from './port/achievement-repository'


class AchievementRepository implements AchievementsRepository {
  private readonly achievementRepository
  constructor() {
    this.achievementRepository = dataSource.getRepository(Achievement)
  }

  async findOneById(id: string): Promise<Achievement | undefined> {

    const achievement = await this.achievementRepository.findOneBy({
        id
      })
      if (!achievement) {
        return undefined
      }
      return achievement
  }

}

export default AchievementRepository