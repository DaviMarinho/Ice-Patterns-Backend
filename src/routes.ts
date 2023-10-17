import { Router } from 'express'
import { adaptExpressRoute } from './adapters/express-router'
import { makeCreateUserController } from './factories/controllers/create-user'
import { makeLoginController } from './factories/controllers/login'
import { makeGetUserController } from './factories/controllers/get-user'
import { makeReceiveTradeItemController } from './factories/controllers/receiveTradeItem'
import { makeReceiveAchievementController } from './factories/controllers/receiveAchievement'
import { makeGetUserAchievementsController } from './factories/controllers/getUserAchievements'
import { auth } from './middlewares/auth'

const routes = Router()

routes.post('/create-user', adaptExpressRoute(makeCreateUserController()))
routes.post('/login', adaptExpressRoute(makeLoginController()))
routes.get('/get-user', auth, adaptExpressRoute(makeGetUserController()))

routes.post('/receiveTradeItem', auth, adaptExpressRoute(makeReceiveTradeItemController()))

routes.post('/receiveAchievement', auth, adaptExpressRoute(makeReceiveAchievementController()))
routes.get('/getUserAchievements', auth, adaptExpressRoute(makeGetUserAchievementsController()))


export default routes