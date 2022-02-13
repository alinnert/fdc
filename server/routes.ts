import { Express } from 'express'
import { resolve } from 'path'
import { getElementByName } from './api/getElementByName'
import { getElements } from './api/getElements'

export function applyRoutes(server: Express): void {
  server.get('/api/elements', getElements)
  server.get('/api/element/:elementName', getElementByName)
  server.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'ui/index.html'))
  })
}
