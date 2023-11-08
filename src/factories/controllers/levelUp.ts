import { LevelUpController } from '../../controllers/levelUp'
import { makeLevelUp } from '../usecases/levelUp'

export const makeLevelUpController = () => {
  return new LevelUpController(makeLevelUp())
}
