import { Achievement } from '../../db/entities/achievement'

export interface AchievementsRepository {
    findOneById(id: string): Promise<Achievement | undefined>
}