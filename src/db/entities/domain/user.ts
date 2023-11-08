import { Sublevel } from './sublevel'
import { UserAchievement } from './userAchievement'

export type User = {
    username: string

    name: string
  
    email: string
    
    password: string

    qtBooster: number

    qtEnergy: number

    qtCube: number

    qtXpOnLevel: number
    
    qtXpTotal: number
  
    createdAt?: Date
  
    updatedAt?: Date

    userAchievements?: UserAchievement[];

    sublevel: Sublevel;
  }