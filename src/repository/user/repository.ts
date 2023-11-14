import { UpdateResult } from 'typeorm'
import { dataSource } from '../../db/config'
import { Sublevel } from '../../db/entities/sublevel'
import { User } from '../../db/entities/user'
import { Repository } from '../port/user-repository'

interface options {
  name: string
  email: string
  username: string
  password: string
}
class UserRepository implements Repository {
  private readonly userRepository
  constructor() {
    this.userRepository = dataSource.getRepository(User)
  }

  async createUser(params: options): Promise<User | undefined> {
    const { name, email, username, password } = params

    const user = this.userRepository.create({
      name,
      email: email !== '' ? email : undefined,
      username,
      password
    })

    await this.userRepository.save(user)
    return user
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
    const user = await this.userRepository.findOne({
      where: {
        email: email,
    },
    relations: {
      sublevel: true
    }})
    if (!user) {
      return undefined
    }
    return user
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
    },
    relations: {
      sublevel: true
    }})
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

  async updateUserXpPoints(username: string, qtXpOnLevel: number, qtXpTotal: number): Promise<UpdateResult | undefined> {
    const result = await this.userRepository.update({
      username,
    }, {
      qtXpOnLevel,
      qtXpTotal
    })

    return result
  }

  async updateUserSublevel(username: string, nextSublevel: Sublevel, qtXpOnLevel: number): Promise<UpdateResult | undefined> {
    const result = await this.userRepository.update({
      username,
    }, {
      sublevel: nextSublevel,
      qtXpOnLevel
    })

    return result
  }
  // async receiveAchievement(username: string, idAchievement: string): Promise<UpdateResult | undefined> {

  //   const user = await this.userRepository.findOneBy({
  //     username
  //   })
  //   if (!user) {
  //     return undefined
  //   }

  //   const achievementsList = user.achievements
    
  //   const newAchievement = await this.achievementRepository.findOneBy({
  //     id
  //   })
  //   if (!newAchievement) {
  //     return undefined
  //   }

  //   achievementsList?.push(newAchievement)

  //   const userAchievement = this.userAchievementRepository.create({
  //     username,
  //     achievementsId: idAchievement,
  //     dateTime
  //   })

  //   await this.userAchievementRepository.save(userAchievement)
  //   return userAchievement
  // }


}

export default UserRepository