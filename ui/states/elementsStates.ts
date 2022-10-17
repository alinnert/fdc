import { selector } from 'recoil'
import { ElementsApiResult } from '../../global/ApiResult'
import { endpoint } from '../lib/api'

export const elementsState = selector<ElementsApiResult>({
  key: 'elements',
  async get() {
    const result = await fetch(endpoint('api/elements'))
    return await result.json()
  },
})

export const elementsCountState = selector<number>({
  key: 'elements count',
  get({ get }) {
    const elements = get(elementsState)
    if (elements.status !== 'ok') return 0
    return Object.values(elements.data).flat().length
  },
})
