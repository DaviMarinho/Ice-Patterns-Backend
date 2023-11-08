import { GetUserMissionsController } from '../../controllers/getUserMissions'
import { makeGetUserMissions } from '../usecases/getUserMissions'

export const makeGetUserMissionsController = () => {
  return new GetUserMissionsController(makeGetUserMissions())
}
