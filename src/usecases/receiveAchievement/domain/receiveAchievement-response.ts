import { UserAchievement } from "../../../db/entities/userAchievement"

export interface ReceiveAchievementResponse {
    username: string
    idAchievement: string
    userAchievement: UserAchievement
}
  