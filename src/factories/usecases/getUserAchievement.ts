import AchievementRepository from '../../repository/achievemet-repository'
import UserRepository from '../../repository/user/repository'
import UserAchievementRepository from '../../repository/userAchievement-repository'
import { GetUserAchievementsUseCase } from '../../usecases/getUserAchievements/use-case'

export const makeGetUserAchievements = () => {
    const userRepository = new UserRepository()
    const userAchievementRepository = new UserAchievementRepository()
    const achievementRepository = new AchievementRepository()
  return new GetUserAchievementsUseCase(userRepository, achievementRepository, userAchievementRepository)
}
