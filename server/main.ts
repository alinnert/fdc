#!/usr/bin/env node
import { spawn } from 'child_process'
import cors from 'cors'
import express from 'express'
import mri from 'mri'
import { resolve } from 'path'
import { argv, env } from 'process'
import { RipGrepResult } from './RipGrepResult'

const args = mri(argv.slice(2))
const server = express()
const port = args.port ?? process.env.port ?? 4080

if (env.NODE_ENV === 'development') {
  server.use(cors({ origin: 'http://localhost:3000' }))
}

server.use(express.static(resolve(__dirname, 'ui')))

server.get('/api', (req, res) => {
  res.send(`API GET! ${env.NODE_ENV}`)
})

server.get('/api/elements', (req, res) => {
  const result: RipGrepResult = {}
  const rg = spawn('rg', [
    // Options
    '--line-number',
    '--glob',
    '**/*.xsd',
    // Pattern
    '<.+:element.+name=".+".*>',
    // Path
    './',
  ])

  rg.stdout.on('data', (data: Buffer) => {
    const output = data.toString().split('\n')

    for (const outputLine of output) {
      const match = /^(.*):(\d+):(.*)$/.exec(outputLine)
      if (match === null) continue
      const [, file, line, text] = match
      if (result[file] === undefined) {
        result[file] = []
      }

      result[file].push({ line, text })
    }
  })

  rg.on('close', (code) => {
    res.send(JSON.stringify(result))
  })
})

server.listen(port, () => {
  console.log(
    `

******************************************
* Server started: http://localhost:${port}/ *
******************************************
`,
  )
})
