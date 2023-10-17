import { UserAchievement } from "../../../db/entities/domain/userAchievement"

export interface ReceiveAchievementResponse {
    username: string
    idAchievement: string
    userAchievement: UserAchievement
}
  