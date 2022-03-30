import express from 'express'
import cors from 'cors'

import { useAppRouter } from './App'
import { useItemRouter } from './Items'

const app = express()
const router = express.Router()

const SERVER_PORT = process.env.SERVER_PORT || '5000'
const API_VERSION = process.env.API_VERSION || 'v1'
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*'
const CORS_METHOD = process.env.CORS_METHOD || '*'

app
  .use(cors({
    origin: CORS_ORIGIN,
    methods: CORS_METHOD,
    allowedHeaders: '*',
    exposedHeaders: [
      'ETag',
      'Cache-Control',
      'Content-Language',
      'Content-Type',
      'Expires',
      'Last-Modified',
      'Pragma',
    ],
  }))
  .use(express.urlencoded({ extended: false, limit: '2mb' }), express.json({ limit: '5mb' }))
  .use(`/${API_VERSION}`, router)

useAppRouter(router)
useItemRouter(router)

app.listen(SERVER_PORT, function () {
  console.log(`Listening on port ${SERVER_PORT}!`)
})