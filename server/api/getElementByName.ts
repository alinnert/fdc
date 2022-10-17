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
    const pattern = `configureAs([A-Za-z]+)[\\s]*\\([\\s]*sxModule[\\s]*,[\\s]*['"](self::${elementName}[^a-zA-Z-].*?)['"]`

    await grep({
      glob: '**/configureSx*.js',
      pattern,

      onMatch(message) {
        const matches = message.data.lines.text.match(pattern)
        if (matches === null) return

        const [, familyType, selector] = matches

        result.familyConfigs.push({
          familyType,
          selector,
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
