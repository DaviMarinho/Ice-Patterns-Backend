export class LevelMaxError extends Error {
    constructor() {
      super('O usuário completou o nível máximo!')
      this.name = 'LevelMaxError'
    }
  }
  