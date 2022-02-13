import { atom, selector } from 'recoil'
import { ElementDetailApiResult } from '../../global/ApiResult'
import { ElementDetailResult } from '../../global/ElementDetailResult'
import { endpoint } from '../lib/api'

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
