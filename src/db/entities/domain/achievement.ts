import { UserAchievement } from './userAchievement'


export type Achievement = {
    id: string

    name: string
  
    description: string
 
    createdAt?: Date
  
    updatedAt?: Date

    userAchievements?: UserAchievement[];
  }