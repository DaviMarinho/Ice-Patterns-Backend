import { User } from '../../db/entities/domain/user'

export interface Repository {
  createUser(params: {
    name: string
    email: string
    username: string
    password: string
  }): Promise<User | undefined>
  findToLogin(email: string): Promise<User | undefined>
}