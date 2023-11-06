// import { UserAchievement } from './userAchievement'


export type Mission = {
    id: string

    name: string
  
    description: string

    rewardBooster: number

    rewardEnergy: number

    unlocksOnLevel: number
 
    createdAt?: Date
  
    updatedAt?: Date

    // userAchievements?: UserAchievement[];
  }