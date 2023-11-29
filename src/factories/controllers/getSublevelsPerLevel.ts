import { GetSublevelsPerLevelController } from '../../controllers/getSublevelsPerLevel'
import { makeGetSublevelsPerLevel } from '../usecases/getSublevelsPerLevel'

export const makeGetSublevelsPerLevelController = () => {
  return new GetSublevelsPerLevelController(makeGetSublevelsPerLevel())
}
