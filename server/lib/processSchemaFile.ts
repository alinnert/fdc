import { DOMParser } from '@xmldom/xmldom'
import { readFile } from 'node:fs/promises'
import { ElementsResultItem } from '../../global/ElementsResult.js'
import { XMLSchemaNamespaceURI } from './namespaceURLs.js'
import { arrayFromNodeList } from './xmldom/arrayFromNodeList.js'
import { getParentElements } from './xmldom/getParentElements.js'
import { isElement } from './xmldom/isElement.js'
import { mapNodeOrElement } from './xmldom/mapNodeOrElement.js'

const parser = new DOMParser()

export async function processSchemaFile(
  filePath: string,
): Promise<[filePath: string, result: ElementsResultItem[]]> {
  const fileContent = await readFile(filePath, { encoding: 'utf-8' })
  const document = parser.parseFromString(fileContent, 'application/xml')
  const rootChildNodes = document.documentElement.childNodes
  const firstLevelNodes: Node[] = arrayFromNodeList(rootChildNodes)
  const elementDefinitions = firstLevelNodes.filter(
    isElement('element', XMLSchemaNamespaceURI),
  )

  const resultItems: ElementsResultItem[] =
    elementDefinitions.flatMap<ElementsResultItem>((element) => {
      const childElementDefinitions = element.getElementsByTagNameNS(
        XMLSchemaNamespaceURI,
        'element',
      )

      const elementName = element.getAttribute('name') || '?'

      const descendantItems = mapNodeOrElement<ElementsResultItem | null>(
        childElementDefinitions,
        (element) => {
          const elementName = (element as Element).getAttribute('name')
          if (elementName === null || elementName.trim() === '') {
            return null
          }

          const parents = getParentElements(element as Element)
            .filter(isElement('element', XMLSchemaNamespaceURI))
            .map((element) => element.getAttribute('name') || '?')

          const lineNumber = 1000
          return { elementName, parents, lineNumber }
        },
      )

      return [
        { elementName, lineNumber: 1 },
        ...descendantItems.filter(
          (item): item is ElementsResultItem => item !== null,
        ),
      ]
    })
  return [filePath, resultItems]
}
