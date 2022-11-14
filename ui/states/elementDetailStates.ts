import { atom, selector } from 'recoil'
import { ElementDetailApiResult } from '../../global/ApiResult.js'
import { endpoint } from '../lib/api.js'
import { getElementPathFromElementResultItem } from '../lib/elements.js'
import { elementsState } from './elementsStates.js'

export const elementPathState = atom<string[] | null>({
  key: 'element name',
  default: null,
})

export const elementDetailState = selector<ElementDetailApiResult | null>({
  key: 'element detail',
  async get({ get }) {
    const elementPath = get(elementPathState)
    if (elementPath === null) {
      return null
    }

    const elementName = elementPath[elementPath.length - 1]
    const result = await fetch(endpoint(`api/element/${elementName}`))
    return await result.json()
  },
})

export type CurrentFilenameState = {
  filename: string
}

export const currentFileDataState = selector<CurrentFilenameState | null>({
  key: 'current filename',
  get({ get }) {
    const elements = get(elementsState)
    const elementPath = get(elementPathState)

    if (elements.status !== 'ok') return null
    if (elementPath === null) return null

    for (const [filename, containedElements] of Object.entries(elements.data)) {
      for (const element of containedElements) {
        if (
          getElementPathFromElementResultItem(element) === elementPath.join('/')
        ) {
          return { filename }
        }
      }
    }

    return null
  },
})
