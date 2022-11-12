#!/usr/bin/env node
import express from 'express'
import { folderArg, portArg } from './args.js'
import { applyMiddleware } from './middleware.js'
import { applyRoutes } from './routes.js'

const server = express()

applyMiddleware(server)
applyRoutes(server)

server.listen(portArg, () => {
  console.log(
    `
  Fonto Dev Companion server running

  > Address: http://localhost:${portArg}/
  > Folder:  ${folderArg}
`,
  )
})
