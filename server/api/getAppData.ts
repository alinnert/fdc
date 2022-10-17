import { RequestHandler } from 'express'
import { AppDataResult } from '../../global/AppDataResult'
import { folderArg } from '../args'
import { apiSuccessResult } from '../lib/apiResult'

export const getAppData: RequestHandler = (req, res) => {
  const result: AppDataResult = { basePath: folderArg }

  res.send(apiSuccessResult(result))
}
