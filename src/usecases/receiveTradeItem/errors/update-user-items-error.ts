export class UpdateUserItemsError extends Error {
    constructor() {
      super('Falha ao atualizar itens do usuário')
      this.name = 'UpdateUserItemsError'
    }
  }
  