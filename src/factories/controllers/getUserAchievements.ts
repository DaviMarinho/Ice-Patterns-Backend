import { GetUserAchievementsController } from '../../controllers/getUserAchievements'
import { makeGetUserAchievements } from '../usecases/getUserAchievement'

export const makeGetUserAchievementsController = () => {
  return new GetUserAchievementsController(makeGetUserAchievements())
}
