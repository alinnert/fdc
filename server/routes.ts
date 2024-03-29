import { Express } from 'express'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { getAppData } from './api/getAppData.js'
import { getElementByName } from './api/getElementByName.js'
import { getElements } from './api/getElements.js'
import { postOpenInVSCode } from './api/postOpenInVSCode.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export function applyRoutes(server: Express): void {
  server.get('/api/appdata', getAppData)
  server.get('/api/elements', getElements)
  server.get('/api/element/:elementName', getElementByName)
  server.post('/api/actions/open-in-vscode', postOpenInVSCode)
  server.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'ui/index.html'))
  })
}
