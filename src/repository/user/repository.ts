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

  async activateBooster(username: string, boosterActive: boolean, boosterActiveDateTime?: Date, boosterDeactiveDateTime?: Date): Promise<UpdateResult | undefined> {
    const result = await this.userRepository.update({
      username,
    }, {
      boosterActive,
      boosterActiveDateTime,
      boosterDeactiveDateTime
    })

    return result
  }

  async listAll(): Promise<User[] | undefined> {
    const users = await this.userRepository.find({
      select: {
        username: true,
        qtEnergy: true,
        qtCube: true,
        qtBooster: true
    },
    })

    if (!users) {
      return undefined
    }
    return users
  }

  async buyFromStore(username: string, boughtFromStore: boolean): Promise<UpdateResult | undefined> {
    const result = await this.userRepository.update({
      username,
    }, {
      boughtFromStore,
    })

    return result
  }


}

export default UserRepository