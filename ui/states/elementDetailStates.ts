import { atom, selector } from 'recoil'
import { ElementDetailApiResult } from '../../global/ApiResult.js'
import { endpoint } from '../lib/api.js'
import { elementsState } from './elementsStates.js'

export const elementNameState = atom<string | null>({
  key: 'element name',
  default: null,
})

export const elementDetailState = selector<ElementDetailApiResult | null>({
  key: 'element detail',
  async get({ get }) {
    const elementName = get(elementNameState)
    if (elementName === null) {
      return null
    }

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
    const elementName = get(elementNameState)

    if (elements.status !== 'ok') return null

    for (const [filename, containedElements] of Object.entries(elements.data)) {
      for (const element of containedElements) {
        if (element.elementName === elementName) {
          return { filename }
        }
      }
    }

    return null
  },
})
