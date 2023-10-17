import { Achievement } from "../../../db/entities/achievement";

export interface DetailedAchievement {
    achievement: Achievement,
    dateTime: Date
}

export interface GetUserAchievementsResponse {
    achievements: DetailedAchievement[]
}
