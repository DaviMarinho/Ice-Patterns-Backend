import { Router } from 'express'
import { adaptExpressRoute } from './adapters/express-router'
import { makeCreateUserController } from './factories/controllers/create-user'
import { makeLoginController } from './factories/controllers/login'
import { makeGetUserController } from './factories/controllers/get-user'
import { makeReceiveTradeItemController } from './factories/controllers/receiveTradeItem'
import { makeReceiveAchievementController } from './factories/controllers/receiveAchievement'
import { makeGetUserAchievementsController } from './factories/controllers/getUserAchievements'
import { makeLevelUpController } from './factories/controllers/levelUp'
import { makeGetUserMissionsController } from './factories/controllers/getUserMissons'
import { makeGetSublevelContentsController } from './factories/controllers/getSublevelContents'
import { auth } from './middlewares/auth'

const routes = Router()

routes.post('/create-user', adaptExpressRoute(makeCreateUserController()))
routes.post('/login', adaptExpressRoute(makeLoginController()))
routes.get('/get-user', auth, adaptExpressRoute(makeGetUserController()))

routes.post('/receiveTradeItem', auth, adaptExpressRoute(makeReceiveTradeItemController()))

routes.post('/receiveAchievement', auth, adaptExpressRoute(makeReceiveAchievementController()))
routes.get('/getUserAchievements', auth, adaptExpressRoute(makeGetUserAchievementsController()))

routes.post('/levelUp', auth, adaptExpressRoute(makeLevelUpController()))
routes.get('/getUserMissions', auth, adaptExpressRoute(makeGetUserMissionsController()))

routes.get('/getSublevelContents', auth, adaptExpressRoute(makeGetSublevelContentsController()))

export default routes