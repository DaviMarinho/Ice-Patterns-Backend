import { BcryptAdapter } from '../../adapters/bcrypt-adapter'
import SublevelRepository from '../../repository/sublevel-repository'
import UserRepository from '../../repository/user/repository'
import { CreateUserUseCase } from '../../usecases/create-user/use-case'

export const makeCreateUser = () => {
  const encryptor = new BcryptAdapter()
  const userRepository = new UserRepository()
  const sublevelRepository = new SublevelRepository()
  return new CreateUserUseCase(encryptor, userRepository, sublevelRepository)
}