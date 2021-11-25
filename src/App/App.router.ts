import { Router } from 'express'

export const useAppRouter = (router: Router) =>
  // App page route
  router.get('/info', function (_, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send({
      version: '1'
    })
  })
