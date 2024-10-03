import { forEachNodeOrElement } from './forEachNode'

export function mapNodeOrElement<T>(
  nodesOrElements: NodeListOf<Node> | HTMLCollectionOf<Element>,
  callback: (nodeOrElement: Node | Element) => T,
): T[] {
  const result: T[] = []
  forEachNodeOrElement(nodesOrElements, (nodeOrElement) => {
    result.push(callback(nodeOrElement))
  })
  return result
}
