export class LoginEmailError extends Error {
    constructor() {
      super('Email nao cadastrado!')
      this.name = 'LoginEmailError'
    }
}