import { ReceiveAchievementController } from '../../controllers/receiveAchievement'
import { makeReceiveAchievement } from '../usecases/receiveAchievement'

export const makeReceiveAchievementController = () => {
  return new ReceiveAchievementController(makeReceiveAchievement())
}
