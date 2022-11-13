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
