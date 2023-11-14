import { ChangeXpPointsController } from '../../controllers/changeXpPoints'
import { makeChangeXpPoints } from '../usecases/changeXpPoints'

export const makeChangeXpPointsController = () => {
  return new ChangeXpPointsController(makeChangeXpPoints())
}
