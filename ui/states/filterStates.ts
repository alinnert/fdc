import fuzzysort from 'fuzzysort'
import { atom, selector } from 'recoil'
import {
  ElementsResultItem,
  SearchableElementsResult,
  SearchableElementsResultItem,
} from '../../global/ElementsResult.js'
import { searchableElementsState } from './elementsStates.js'

export const filterStringState = atom({ key: 'filterString', default: '' })

export const filteredElementsState = selector<SearchableElementsResult>({
  key: 'filteredElements',
  get({ get }) {
    const searchableElements = get(searchableElementsState)
    const filterString = get(filterStringState)

    if (filterString === '') {
      return searchableElements ?? {}
    }

    if (searchableElements === null) {
      return {}
    }

    const result: SearchableElementsResult = {}

    for (const [filename, results] of Object.entries(searchableElements)) {
      const fuzzysortResults = fuzzysort.go<SearchableElementsResultItem>(
        filterString,
        results,
        { keys: ['searchString'] },
      )

      if (fuzzysortResults.length === 0) continue

      for (const fuzzysortResult of fuzzysortResults) {
        if (result[filename] === undefined) {
          result[filename] = []
        }

        result[filename].push(fuzzysortResult.obj)
      }
    }

    return result
  },
})

export const flatFilteredElementsState = selector<ElementsResultItem[]>({
  key: 'flatFilteredElements',
  get({ get }) {
    const filteredElements = get(filteredElementsState)
    return Object.values(filteredElements).flat()
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
