import { selector } from 'recoil'
import { ElementsApiResult } from '../../global/ApiResult.js'
import { SearchableElementsResult } from '../../global/ElementsResult.js'
import { endpoint } from '../lib/api.js'
import { getElementPathFromElementResultItem } from '../lib/elements.js'

export const elementsState = selector<ElementsApiResult>({
  key: 'elements',
  async get() {
    const result = await fetch(endpoint('api/elements'))
    return await result.json()
  },
})

export const searchableElementsState =
  selector<SearchableElementsResult | null>({
    key: 'searchable elements',
    async get({ get }) {
      const elements = get(elementsState)
      if (elements.status !== 'ok') return null

      const result: SearchableElementsResult = {}
      const { data } = elements

      for (const [file, resultItems] of Object.entries(data)) {
        result[file] = []
        for (const resultItem of resultItems) {
          result[file].push({
            ...resultItem,
            get searchString() {
              return getElementPathFromElementResultItem(resultItem)
            },
          })
        }
      }

      return result
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
