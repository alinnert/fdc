import { RequestHandler } from 'express'
import { spawn } from 'node:child_process'
import { folderArg } from '../args'

export const getElementByName: RequestHandler = (req, res) => {
  const elementName = req.params.elementName
  
  const rgFamilyConfig = spawn('rg', [
    // Options
    '--line-number',
    '--glob',
    '**/configureSx*.js',
    // Pattern
    `configureAs.+(\s*sxModule\s*,\s*['"]${elementName}['"]`,
    // Path
    folderArg,
  ])

  rgFamilyConfig.stdout.on('data', (data: Buffer) => {
    console.log(data.toString())
  })

  rgFamilyConfig.on('close', () => {
    res.send('implement me')
  })
}
