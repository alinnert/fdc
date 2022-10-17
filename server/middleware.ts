import cors from 'cors'
import express, { Express } from 'express'
import { resolve } from 'path'
import { env } from 'process'

export function applyMiddleware(server: Express): void {
  if (env.NODE_ENV === 'development') {
    server.use(cors({ origin: 'http://localhost:5173' }))
  }

  server.use(express.static(resolve(__dirname, 'ui')))
}
