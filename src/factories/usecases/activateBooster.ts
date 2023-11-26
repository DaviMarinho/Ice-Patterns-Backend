import UserRepository from '../../repository/user/repository'
import { ActivateBoosterUseCase } from '../../usecases/activateBooster/use-case'

export const makeActivateBooster = () => {
  const userRepository = new UserRepository()
  return new ActivateBoosterUseCase(userRepository)
}
