import { ElementsResultItem } from '../../global/ElementsResult.js'

export const getElementPath = (
  parents: string[] | null | undefined,
  elementName: string,
): string => [...(parents ?? []), elementName].join('/')

export const getElementPathFromElementResultItem = (item: ElementsResultItem) =>
  getElementPath(item.parents, item.elementName)

export const elementPathsAreEqual = (
  pathA: string | string[],
  pathB: string | string[],
): boolean =>
  (Array.isArray(pathA) ? pathA.join('/') : pathA) ===
  (Array.isArray(pathB) ? pathB.join('/') : pathB)
