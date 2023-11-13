export class QtError extends Error {
    constructor(tipo: string) {
      super(`Quantidade insuficiente de ${tipo}`)
      this.name = 'QtError'
    }
  }
  