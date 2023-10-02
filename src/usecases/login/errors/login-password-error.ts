export class LoginPasswordError extends Error {
    constructor() {
      super('Senha incorreta!')
      this.name = 'LoginPasswordError'
    }
  }