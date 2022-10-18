import { FC, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { ElementsResultItem } from '../../../global/ElementsResult'
import { elementsCountState } from '../../states/elementsStates'
import {
  filteredElementsCountState,
  filteredElementsState,
} from '../../states/filterStates'
import { FilterInput } from '../filter/FilterInput'
import { EmptyIndicator } from '../ui/EmptyIndicator'
import { ToolbarContainer } from '../ui/ToolbarContainer'
import { ElementsListHeader } from './ElementsListHeader'
import { ElementsListItem } from './ElementsListItem'

export const ElementsList: FC = () => {
  const navigate = useNavigate()
  const elements = useRecoilValue(filteredElementsState)
  const elementsCount = useRecoilValue(elementsCountState)
  const filteredElementsCount = useRecoilValue(filteredElementsCountState)

  function handleItemClick(item: ElementsResultItem): void {
    navigate(`/element/${item.elementName}`)
  }

  return (
    <ToolbarContainer
      title={
        <div className="flex items-center">
          {filteredElementsCount > 0 && filteredElementsCount !== elementsCount
            ? `${filteredElementsCount} / `
            : ''}
          {elementsCount} {elementsCount === 1 ? 'element' : 'elements'}
        </div>
      }
      secondaryContent={
        <Suspense fallback={<></>}>
          <FilterInput />
        </Suspense>
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
