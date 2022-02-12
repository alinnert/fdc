import { RequestHandler } from 'express'
import { spawn } from 'node:child_process'
import { EOL } from 'node:os'
import { ElementsResult } from '../../global/ElementsResult'
import { folderArg } from '../args'
import { apiSuccessResult } from '../lib/apiResult'

export const getElements: RequestHandler = (req, res) => {
  const result: ElementsResult = {}

  const rg = spawn('rg', [
    // Options
    '--line-number',
    '--glob',
    '**/*.xsd',
    // Pattern
    '<.+:element.+name=".+".*>',
    // Path
    folderArg,
  ])

  rg.stdout.on('data', (data: Buffer) => {
    const output = data.toString().split(EOL)

    for (const outputLine of output) {
      const rgMatch = outputLine.match(/^(.*):([0-9]+):(.*name="([^"]+)".*)$/)
      if (rgMatch === null) continue
      const [, file, line, , elementName] = rgMatch

      if (result[file] === undefined) {
        result[file] = []
      }

      result[file].push({ line, elementName })
    }
  })

  rg.on('close', () => {
    res.send(apiSuccessResult(result))
  })
}
