#!/usr/bin/env node
import express from 'express'
import { folderArg, portArg } from './args'
import { applyMiddleware } from './middleware'
import { applyRoutes } from './routes'

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
