import cors from 'cors'
import express, { Express } from 'express'
import { resolve } from 'node:path'
import { env } from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export function applyMiddleware(server: Express): void {
  if (env.NODE_ENV === 'development') {
    server.use(cors({ origin: 'http://localhost:5173' }))
  }

  server.use(express.static(resolve(__dirname, 'ui')))
  server.use(express.json())
}
