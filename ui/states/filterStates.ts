import fuzzysort from 'fuzzysort'
import { atom, selector } from 'recoil'
import { ElementsApiResult } from '../../global/ApiResult'
import { ElementsResult, ElementsResultItem } from '../../global/ElementsResult'
import { elementsState } from './elementsStates'

export const filterStringState = atom({ key: 'filterString', default: '' })

export const filteredElementsState = selector<ElementsApiResult>({
  key: 'filteredElements',
  get({ get }) {
    const elements = get(elementsState)
    const filterString = get(filterStringState)

    if (filterString === '') {
      return elements
    }

    if (elements.status !== 'ok') {
      return elements
    }

    const result: ElementsResult = {}

    for (const [filename, results] of Object.entries(elements.data)) {
      const fuzzysortResults = fuzzysort.go<ElementsResultItem>(
        filterString,
        results,
        { key: 'elementName', allowTypo: false },
      )

      if (fuzzysortResults.length === 0) continue

      for (const fuzzysortResult of fuzzysortResults) {
        if (result[filename] === undefined) {
          result[filename] = []
        }

        result[filename].push(fuzzysortResult.obj)
      }
    }

    return { status: 'ok', data: result }
  },
})
