import { ReceiveTradeItemController } from '../../controllers/receiveTradeItem'
import { makeReceiveTradeItem } from '../usecases/receiveTradeItem'

export const makeReceiveTradeItemController = () => {
  return new ReceiveTradeItemController(makeReceiveTradeItem())
}
