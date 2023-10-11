import { BcryptAdapter } from '../../adapters/bcrypt-adapter'
import UserRepository from '../../repository/user/repository'
import { ReceiveTradeItemUseCase } from '../../usecases/receiveTradeItem/use-case'

export const makeReceiveTradeItem = () => {
  const encryptor = new BcryptAdapter()
  const userRepository = new UserRepository()
  return new ReceiveTradeItemUseCase(encryptor, userRepository)
}
