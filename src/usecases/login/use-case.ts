import { Encryptor } from '../../adapters/bcrypt-adapter'
import { Token } from '../../adapters/token-adapter'
import { Repository } from '../../repository/port/user-repository'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { DataUserLogin } from './domain/login-request'
import { UserLoginResponse } from './domain/login-response'
import { LoginEmailError } from './errors/login-email-error'
import { LoginPasswordError } from './errors/login-password-error'

export class LoginUseCase implements UseCase<UserLoginResponse> {
  constructor(
    private userRepository: Repository,
    private encryptor: Encryptor,
    private createToken: Token
  ) {}

  async execute(
    userData: DataUserLogin
  ): Promise<UseCaseReponse<UserLoginResponse>> {
    let userFound = null
    userFound = await this.userRepository.findToLogin(userData.email)

    console.log('passei 1')
    if (!userFound) {
      return { isSuccess: false, error: new LoginEmailError() }
    }
    console.log('passei 2')

    const checkPassword = this.encryptor.compare(
      userData.password,
      userFound.password
    )
    console.log('passei 3')

    if (!checkPassword) {
      return { isSuccess: false, error: new LoginPasswordError() }
    }
    console.log('passei 4')

    console.log('env secret', process.env.SECRET_JWT)
    const timeExpire = '600s'
    const token = this.createToken.createToken(
      { username: userFound.username, email: userFound.email, name: userFound.name },
      process.env.SECRET_JWT,
      { expiresIn: timeExpire }
    )
    console.log('passei 5')

    return {
      isSuccess: true,
      body: {
        token,
        email: userFound.email,
        username: userFound.username,
        name: userFound.name,
        expireIn: timeExpire
      }
    }
  }
}
