import { forEachNodeOrElement } from './forEachNode.js'

export function arrayFromNodeList(nodes: NodeListOf<Node>): Node[] {
  const result: Node[] = []
  forEachNodeOrElement(nodes, (node) => result.push(node))
  return result
}
