import { dataSource } from '../../db/config'
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
    const user = await this.userRepository.findOneBy({
      email
    })
    if (!user) {
      return undefined
    }
    return user
  }

}

export default UserRepository