import { BcryptAdapter } from '../../adapters/bcrypt-adapter'
import AchievementRepository from '../../repository/achievemet-repository'
import UserRepository from '../../repository/user/repository'
import UserAchievementRepository from '../../repository/userAchievement-repository'
import { ReceiveAchievementUseCase } from '../../usecases/receiveAchievement/use-case'

export const makeReceiveAchievement = () => {
  const encryptor = new BcryptAdapter()
  const userRepository = new UserRepository()
  const achievementRepository = new AchievementRepository()
  const userAchievementRepository = new UserAchievementRepository()
  return new ReceiveAchievementUseCase(userRepository, achievementRepository, userAchievementRepository)
}
