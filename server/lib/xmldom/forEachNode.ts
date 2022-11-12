export function forEachNodeOrElement(
  nodesOrElements: NodeListOf<Node> | HTMLCollectionOf<Element>,
  callback: (nodeOrElement: Node | Element) => void,
): void {
  for (let i = 0; i < nodesOrElements.length; i++) {
    const nodeOrElement = nodesOrElements.item(i)
    if (nodeOrElement === null) continue
    callback(nodeOrElement)
  }
}

export function mapNodeOrElement<T>(
  nodesOrElements: NodeListOf<Node> | HTMLCollectionOf<Element>,
  callback: (nodeOrElement: Node|Element) => T,
): T[] {
  const result: T[] = []
  forEachNodeOrElement(nodesOrElements, (nodeOrElement) => {
    result.push(callback(nodeOrElement))
  })
  return result
}
