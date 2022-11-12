import { DOMParser } from '@xmldom/xmldom'
import { readFile } from 'node:fs/promises'
import { ElementsResultItem } from '../../global/ElementsResult.js'
import { forEachNodeOrElement, mapNodeOrElement } from './xmldom/forEachNode.js'

const isElement =
  (elementName: string) =>
  (node: Node): node is Element =>
    node.nodeType === node.ELEMENT_NODE &&
    node.nodeName.toLowerCase() === elementName.toLowerCase()

const XMLSchemaNSURL = 'http://www.w3.org/2001/XMLSchema'
export async function processSchemaFile(
  filePath: string,
): Promise<[filePath: string, result: ElementsResultItem[]]> {
  const fileContent = await readFile(filePath, { encoding: 'utf-8' })
  const parser = new DOMParser()
  const document = parser.parseFromString(fileContent, 'application/xml')
  const firstLevelNodes = document.documentElement.childNodes
  const firstLevelNodesArray: Node[] = []

  forEachNodeOrElement(firstLevelNodes, (node) =>
    firstLevelNodesArray.push(node),
  )

  const elementDefinitions = firstLevelNodesArray.filter(
    isElement('xs:element'),
  )

  const resultItems: ElementsResultItem[] =
    elementDefinitions.flatMap<ElementsResultItem>((element) => {
      const childElementDefinitions = element.getElementsByTagNameNS(
        XMLSchemaNSURL,
        'element',
      )

      const elementName = element.getAttribute('name') || '-'

      const descendantItems = mapNodeOrElement<ElementsResultItem | null>(
        childElementDefinitions,
        (element) => {
          const descendantElementName = (element as Element).getAttribute(
            'name',
          )

          if (
            descendantElementName === null ||
            descendantElementName.trim() === ''
          ) {
            return null
          }

          return {
            elementName: descendantElementName,
            parents: [elementName],
            lineNumber: 2,
          }
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
