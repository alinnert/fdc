export function isElement(localName: string, namespaceURI: string) {
  return (node: Node): node is Element => {
    if (node.nodeType !== node.ELEMENT_NODE) {
      return false
    }

    const element = node as Element

    if (element.localName.toLowerCase() !== localName.toLowerCase()) {
      return false
    }

    if (element.namespaceURI !== namespaceURI) {
      return false
    }

    return true
  }
}
