const isElement = (node: Node): node is Element =>
  node.nodeType === node.ELEMENT_NODE

export function getParentElements(element: Element): Element[] {
  const parents: Element[] = []
  let currentElement: Node | null = element.parentNode

  while (currentElement !== null) {
    if (isElement(currentElement)) {
      parents.unshift(currentElement)
    }
    currentElement = currentElement.parentNode
  }

  return parents
}
