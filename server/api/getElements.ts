import { RequestHandler } from 'express'
import { globby } from 'globby'
import { ElementsResult } from '../../global/ElementsResult.js'
import { folderArg } from '../args.js'
import { apiSuccessResult } from '../lib/apiResult.js'
import { processSchemaFile } from '../lib/processSchemaFile.js'

export const getElements: RequestHandler = async (req, res) => {
  const result: ElementsResult = {}
  const filePaths = await globby(`${folderArg}/**/*.xsd`)
  const promiseResults = await Promise.allSettled(
    filePaths.map(processSchemaFile),
  )

  for (const promiseResult of promiseResults) {
    if (promiseResult.status === 'rejected') continue
    const [filePath, items] = promiseResult.value
    result[filePath] = items
  }

  // #region grep
  // try {
  //   await grep({
  //     glob: '**/*.xsd',
  //     pattern: '<[A-Za-z]+?:element[^>]+?name=".+?".*?>',

  //     onBegin(message) {
  //       const filename = message.data.path.text
  //       result[filename] = []
  //     },

  //     onMatch(message) {
  //       const lineNumber = message.data.line_number
  //       const elementNameMatch = message.data.lines.text.match(
  //         /<[A-Za-z]*:element.+?name=['"](.*?)['"]/,
  //       )
  //       if (elementNameMatch === null) return
  //       const elementName = elementNameMatch[1]
  //       const filename = message.data.path.text
  //       result[filename].push({ lineNumber, elementName })
  //     },

  //     onStderrData(data) {
  //       res.status(500).write(data)
  //     },
  //   })
  // } catch (error) {
  //   res.end()
  //   return
  // }
  // #endregion grep

  res.send(apiSuccessResult(result))
}
