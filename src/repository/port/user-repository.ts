import { UpdateResult } from 'typeorm'
import { Sublevel } from '../../db/entities/sublevel'
import { User } from '../../db/entities/user'

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
  updateUserItemQuantity(username: string, qtCube: number, qtEnergy: number, qtBooster: number): Promise<UpdateResult | undefined>
  updateUserXpPoints(username: string, qtXpOnLevel: number, qtXpTotal: number): Promise<UpdateResult | undefined>
  updateUserSublevel(username: string, nextSublevel: Sublevel, qtXpOnLevel: number): Promise<UpdateResult | undefined>
  activateBooster(username: string, boosterActive: boolean, boosterActiveDateTime?: Date, boosterDeactiveDateTime?: Date): Promise<UpdateResult | undefined>
}