import { UpdateResult } from 'typeorm'
import { dataSource } from '../db/config'
import { Achievement } from '../db/entities/achievement'
import { User } from '../db/entities/user'
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

  async findToLogin(email: string): Promise<User> {
    const userPassword = await this.userRepository.find({
      where: {
        email
      },
      select: ['password', 'email', 'username', 'name']
    })
    return userPassword[0]
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({
      email
    })
    if (!user) {
      return undefined
    }
    return user
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({
      username
    })
    if (!user) {
      return undefined
    }
    return user
  }

  async updateUserItemQuantity(username: string, qtCube: number, qtEnergy: number, qtBooster: number): Promise<UpdateResult | undefined> {
    const result = await this.userRepository.update({
      username,
    }, {
      qtCube,
      qtEnergy,
      qtBooster
    })

    return result
  }

  async receiveAchievement(username: string, idAchievement: string): Promise<UpdateResult | undefined> {

    const user = await this.userRepository.findOneBy({
      username
    })
    if (!user) {
      return undefined
    }

    const achievementsList = user.achievements
    
    const newAchievement = await this.achievementRepository.findOneBy({
      id
    })
    if (!newAchievement) {
      return undefined
    }

    achievementsList?.push(newAchievement)

    const userAchievement = this.userAchievementRepository.create({
      username,
      achievementsId: idAchievement,
      dateTime
    })

    await this.userAchievementRepository.save(userAchievement)
    return userAchievement
  }


}

export default UserRepository