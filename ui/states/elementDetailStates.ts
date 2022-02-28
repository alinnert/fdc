import { atom, selector } from 'recoil'
import { ElementDetailApiResult } from '../../global/ApiResult'
import { endpoint } from '../lib/api'
import { elementsState } from './elementsStates'

export const elementNameState = atom<string | null>({
  key: 'elementName',
  default: null,
})

export const elementDetailState = selector<ElementDetailApiResult | null>({
  key: 'elementDetail',
  async get({ get }) {
    const elementName = get(elementNameState)
    if (elementName === null) {
      return null
    }

    const result = await fetch(endpoint(`api/element/${elementName}`))
    return await result.json()
  },
})

export const currentFilenameState = selector<string | null>({
  key: 'current filename',
  get({ get }) {
    const elements = get(elementsState)
    const elementName = get(elementNameState)

    if (elements.status !== 'ok') return null

    return (
      Object.entries(elements.data).find(([filename, elements]) => {
        return elements.some((element) => element.elementName === elementName)
      })?.[0] ?? null
    )
  },
})
