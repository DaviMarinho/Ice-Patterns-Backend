import UserRepository from '../../repository/user/repository'
import SublevelRepository from '../../repository/sublevel-repository'
import { LevelUpUseCase } from '../../usecases/levelUp/use-case'

export const makeLevelUp = () => {
  const userRepository = new UserRepository()
  const sublevelRepository = new SublevelRepository()
  return new LevelUpUseCase(userRepository, sublevelRepository)
}
