import { NextFunction, Request, Response } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'

interface PayLoad extends JwtPayload{
  userEmail: string
}
const secret = process.env.SECRET_JWT || ''

export function auth(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization
    if (!authToken) {
      return res.status(401).end('Token não informado, acesso não autorizado')
    }
    const [, token] = authToken.split(' ')
    try {
      verify(token, secret) as PayLoad
  
      return next()
    } catch (error) {
      return res.status(401).end('Token inválido')
    }
  }
