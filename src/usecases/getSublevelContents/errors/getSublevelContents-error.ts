export class GetSublevelContentsError extends Error {
    constructor() {
      super('Erro ao buscar conteúdos')
      this.name = 'GetSublevelContentsError'
    }
  }
  