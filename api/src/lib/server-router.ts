import express, { Request, Response } from 'express'
import { businessVisaRoute } from './features/business-visa/business-visa-route'
import { pubkeyProfileRoute } from './features/pubkey-profile/pubkey-profile-route'
import { rankCardRoute } from './features/rank-card/rank-card-route'
import { uptimeRoute } from './features/uptime.route'
import { ServerConfig } from './server-config'

export function serverRouter(config: ServerConfig): express.Router {
  const router = express.Router()

  router.use('/business-visa', businessVisaRoute({ cwd: config.cwd }))
  router.use('/rank-card', rankCardRoute({ cwd: config.cwd }))
  router.use('/pubkey-profile', pubkeyProfileRoute({ cwd: config.cwd }))
  router.use('/uptime', uptimeRoute())
  router.use('/', (req: Request, res: Response) => res.send('PubKey API'))
  router.use('*', (req: Request, res: Response) => res.status(404).send('Not Found'))

  return router
}
