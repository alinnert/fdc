import { RequestHandler } from 'express'
import { exec } from 'node:child_process'

export const postOpenInVSCode: RequestHandler<
  null,
  null,
  { file: string }
> = async (req, res) => {
  const { file } = req.body
  if (typeof file !== 'string') {
    res.sendStatus(400)
    return
  }
  exec(`code ${['--goto', '--reuse-window', `"${req.body.file}"`].join(' ')}`)
  res.sendStatus(200)
}
