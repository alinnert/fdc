import { RequestHandler } from 'express'
import { AppDataResult } from '../../global/AppDataResult.js'
import { folderArg } from '../args.js'
import { apiSuccessResult } from '../lib/apiResult.js'

export const getAppData: RequestHandler = (req, res) => {
  const result: AppDataResult = { basePath: folderArg }

  res.send(apiSuccessResult(result))
}
