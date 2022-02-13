import { RequestHandler } from 'express'
import { ElementsResult } from '../../global/ElementsResult'
import { apiSuccessResult } from '../lib/apiResult'
import { grep } from '../lib/grep'

export const getElements: RequestHandler = async (req, res) => {
  const result: ElementsResult = {}

  try {
    await grep({
      glob: '**/*.xsd',
      pattern: '<[A-Za-z]+?:element[^>]+?name=".+?".*?>',

      onBegin(message) {
        const filename = message.data.path.text
        result[filename] = []
      },

      onMatch(message) {
        const lineNumber = message.data.line_number
        const elementNameMatch = message.data.lines.text.match(
          /<[A-Za-z]*:element.+?name=['"](.*?)['"]/,
        )
        if (elementNameMatch === null) return
        const elementName = elementNameMatch[1]
        const filename = message.data.path.text
        result[filename].push({ lineNumber, elementName })
      },

      onStderrData(data) {
        res.status(500).write(data)
      },
    })
  } catch (error) {
    res.end()
    return
  }

  res.send(apiSuccessResult(result))
}
