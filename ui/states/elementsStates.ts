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
