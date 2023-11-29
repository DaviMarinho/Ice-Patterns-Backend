import { ActivateBoosterController } from '../../controllers/activateBooster'
import { makeActivateBooster } from '../usecases/activateBooster'

export const makeActivateBoosterController = () => {
  return new ActivateBoosterController(makeActivateBooster())
}