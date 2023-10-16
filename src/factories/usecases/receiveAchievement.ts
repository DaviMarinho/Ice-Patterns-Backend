import { BcryptAdapter } from '../../adapters/bcrypt-adapter'
import UserRepository from '../../repository/user/repository'
import { ReceiveAchievementUseCase } from '../../usecases/receiveAchievement/use-case'

export const makeReceiveAchievement = () => {
  const encryptor = new BcryptAdapter()
  const userRepository = new UserRepository()
  return new ReceiveAchievementUseCase(userRepository)
}
