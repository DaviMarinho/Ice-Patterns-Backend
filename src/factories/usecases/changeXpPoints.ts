import UserRepository from '../../repository/user/repository'
import { ChangeXpPointsUseCase } from '../../usecases/changeXpPoints/use-case'

export const makeChangeXpPoints = () => {
  const userRepository = new UserRepository()
  return new ChangeXpPointsUseCase(userRepository)
}
