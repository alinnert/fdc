import fuzzysort from 'fuzzysort'
import { atom, selector } from 'recoil'
import { ElementsApiResult } from '../../global/ApiResult.js'
import {
  ElementsResult,
  ElementsResultItem,
} from '../../global/ElementsResult.js'
import { elementsState } from './elementsStates.js'

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
        { key: 'elementName' },
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

export const flatFilteredElementsState = selector<ElementsResultItem[]>({
  key: 'flatFilteredElements',
  get({ get }) {
    const filteredElements = get(filteredElementsState)
    if (filteredElements.status !== 'ok') return []
    return Object.values(filteredElements.data).flat()
  },
})

export const filteredElementsCountState = selector<number>({
  key: 'filteredElementsCount',
  get({ get }) {
    const flatFilteredElements = get(flatFilteredElementsState)
    return flatFilteredElements.length
  },
})

export const firstFilteredElementState = selector<ElementsResultItem>({
  key: 'firstFilteredElement',
  get({ get }) {
    const flatFilteredElements = get(flatFilteredElementsState)
    return flatFilteredElements[0]
  },
})
