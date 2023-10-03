import { Router } from 'express'
import { adaptExpressRoute } from './adapters/express-router'
import { makeCreateUserController } from './factories/controllers/create-user'
import { makeLoginController } from './factories/controllers/login'
import { makeGetUserController } from './factories/controllers/get-user'
import { auth } from './middlewares/auth'

const routes = Router()

routes.post('/create-user', adaptExpressRoute(makeCreateUserController()))
routes.post('/login', adaptExpressRoute(makeLoginController()))
routes.get('/get-user', auth, adaptExpressRoute(makeGetUserController()))


export default routes