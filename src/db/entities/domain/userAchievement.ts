import { Achievement } from "./achievement"
import { User } from "./user"

export type UserAchievement = {
    userUsername: string

    achievementId: string
  
    dateTime: Date

    user: User

    achievement: Achievement
  }