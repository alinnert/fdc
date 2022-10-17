import { RequestHandler } from 'express'
import { ElementDetailResult } from '../../global/ElementDetailResult'
import { apiErrorResult, apiSuccessResult } from '../lib/apiResult'
import { grep } from '../lib/grep'

export const getElementByName: RequestHandler = async (req, res) => {
  const elementName = req.params.elementName

  const result: ElementDetailResult = {
    familyConfigs: [],
    insertOperations: [],
  }

  try {
    await grep({
      glob: '**/configureSx*.js',
      pattern: `configureAs[A-Za-z]+[\\s]*\\([\\s]*sxModule[\\s]*,[\\s]*['"]self::${elementName}[^a-zA-Z-]`,

      onMatch(message) {
        const match = message.data.lines.text.match(/configureAs(.+?)\(/)
        if (match === null) return

        const familyType = match[1]

        result.familyConfigs.push({
          familyType,
          filename: message.data.path.text,
          line: message.data.line_number,
        })
      },

      onStderrData(data) {
        if (res.writableFinished) return
        res.status(500).send(apiErrorResult(data.toString()))
      },
    })
  } catch (error) {
    res.status(500).send(apiErrorResult(`${error}`))
    return
  }

  try {
    await grep({
      glob: '**/operations*.json',
      pattern: `"(contextual|masthead)_insert-${elementName.replace(
        /[-_]/g,
        '[-_]',
      )}"`,

      onMatch({ data }) {
        const operationName = data.submatches[0].match.text.replace(/"/g, '')

        result.insertOperations.push({
          operationName,
          filename: data.path.text,
          line: data.line_number,
        })
      },

      onStderrData(data) {
        if (res.writableFinished) return
        res.status(500).send(apiErrorResult(data.toString()))
      },
    })
  } catch (error) {
    res.status(500).send(apiErrorResult(`${error}`))
  }

  res.send(apiSuccessResult(result))
}
