import { User } from '../../db/entities/domain/user'

export interface Repository {
  createUser(params: {
    name: string
    email: string
    username: string
    password: string
  }): Promise<User | undefined>
  findToLogin(email: string): Promise<User | undefined>
  findOneByEmail(email: string): Promise<User | undefined>
  findOneByUsername(username: string): Promise<User | undefined>
}