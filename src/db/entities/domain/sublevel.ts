// import { UserAchievement } from './userAchievement'

import { User } from "./user"


export type Sublevel = {
    id: string

    numSublevel: number

    numLevel: number
  
    name: string
 
    createdAt?: Date
  
    updatedAt?: Date

    users?: User[]

    // userAchievements?: UserAchievement[];
  }