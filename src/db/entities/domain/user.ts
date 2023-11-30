import { Sublevel } from './sublevel'
import { UserAchievement } from './userAchievement'
import { UserExercise } from './userExercise'
import { UserMission } from './userMission'

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

    boosterActive: boolean

    boosterActiveDateTime?: Date

    boosterDeactiveDateTime?: Date

    boughtFromStore: boolean
  
    createdAt?: Date
  
    updatedAt?: Date

    userAchievements?: UserAchievement[];

    missions?: UserMission[];

    sublevel: Sublevel;

    userExercises?: UserExercise[];
  }