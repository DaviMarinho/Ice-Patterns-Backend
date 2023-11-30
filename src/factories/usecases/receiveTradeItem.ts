import { BcryptAdapter } from '../../adapters/bcrypt-adapter'
import UserRepository from '../../repository/user/repository'
import UserAchievementRepository from '../../repository/userAchievement-repository'
import { ReceiveTradeItemUseCase } from '../../usecases/receiveTradeItem/use-case'

export const makeReceiveTradeItem = () => {
  const encryptor = new BcryptAdapter()
  const userRepository = new UserRepository()
  const userAchievementRepository = new UserAchievementRepository()
  return new ReceiveTradeItemUseCase(userRepository, userAchievementRepository)
}
