import { RequestHandler } from 'express'
import { globby } from 'globby'
import { resolve } from 'node:path'
import { ElementsResult } from '../../global/ElementsResult.js'
import { normalizePath } from '../../ui/lib/path.js'
import { folderArg } from '../args.js'
import { apiSuccessResult } from '../lib/apiResult.js'
import { processSchemaFile } from '../lib/processSchemaFile.js'

export const getElements: RequestHandler = async (req, res) => {
  const result: ElementsResult = {}
  const glob = normalizePath(resolve(folderArg, '**/*.xsd'))
  const filePaths = await globby(glob)
  const promiseResults = await Promise.allSettled(
    filePaths.map(processSchemaFile),
  )

  for (const promiseResult of promiseResults) {
    if (promiseResult.status === 'rejected') continue
    const [filePath, items] = promiseResult.value
    result[filePath] = items
  }

  res.send(apiSuccessResult(result))
}
