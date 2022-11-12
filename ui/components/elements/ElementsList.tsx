import { FC, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'
import { ElementsResultItem } from '../../../global/ElementsResult.js'
import { elementDetailState } from '../../states/elementDetailStates.js'
import { elementsCountState } from '../../states/elementsStates.js'
import {
  filteredElementsCountState,
  filteredElementsState,
} from '../../states/filterStates.js'
import { FilterInput } from '../filter/FilterInput.js'
import { ButtonRow } from '../ui/ButtonRow.js'
import { EmptyIndicator } from '../ui/EmptyIndicator.js'
import { IconButton } from '../ui/IconButton.js'
import { ToolbarContainer } from '../ui/ToolbarContainer.js'
import { ElementsListHeader } from './ElementsListHeader.js'
import { ElementsListItem } from './ElementsListItem.js'

export const ElementsList: FC = () => {
  const navigate = useNavigate()
  const elements = useRecoilValue(filteredElementsState)
  const elementsCount = useRecoilValue(elementsCountState)
  const filteredElementsCount = useRecoilValue(filteredElementsCountState)
  const resetElementDetail = useRecoilRefresher_UNSTABLE(elementDetailState)

  function handleRefresh(): void {
    resetElementDetail()
  }

  function handleItemClick(item: ElementsResultItem): void {
    navigate(`/element/${item.elementName}`)
  }

  return (
    <ToolbarContainer
      title={
        <ButtonRow>
          {filteredElementsCount > 0 && filteredElementsCount !== elementsCount
            ? `${filteredElementsCount} / `
            : ''}
          {elementsCount} {elementsCount === 1 ? 'element' : 'elements'}
        </ButtonRow>
      }
      secondaryContent={
        <ButtonRow>
          <IconButton
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                  clipRule="evenodd"
                />
              </svg>
            }
            onClick={handleRefresh}
          />
          <Suspense fallback={<></>}>
            <FilterInput />
          </Suspense>
        </ButtonRow>
      }
    >
      {elements.status === 'ok' ? (
        <div className="flex flex-col">
          {Object.entries(elements.data).map(([filePath, results], index) => (
            <div key={index} className="bg-white">
              <ElementsListHeader filePath={filePath} results={results} />

              {results.map((result, index) => (
                <ElementsListItem
                  key={index}
                  item={result}
                  onClick={() => handleItemClick(result)}
                />
              ))}
            </div>
          ))}

          {Object.keys(elements.data).length === 0 ? (
            <EmptyIndicator content="No elements found" />
          ) : null}
        </div>
      ) : (
        <>
          <div>Error!</div>
          <div>{elements.error}</div>
        </>
      )}
    </ToolbarContainer>
  )
}
