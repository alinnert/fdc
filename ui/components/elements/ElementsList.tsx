import { FC, MouseEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { ElementsResultItem } from '../../../global/ElementsResult'
import {
  filteredElementsCountState,
  filteredElementsState,
  flatFilteredElementsState,
} from '../../states/filterStates'
import { Card } from '../ui/Card'
import { EmptyIndicator } from '../ui/EmptyIndicator'
import { Filename } from '../ui/Filename'
import { ToolbarContainer } from '../ui/ToolbarContainer'
import { ElementsListItem } from './ElementsListItem'

export const ElementsList: FC = () => {
  const navigate = useNavigate()
  const elements = useRecoilValue(filteredElementsState)
  const flatFilteredElements = useRecoilValue(flatFilteredElementsState)
  const filteredElementsCount = useRecoilValue(filteredElementsCountState)

  useEffect(() => {
    console.log(flatFilteredElements)
  }, [flatFilteredElements])

  function handleItemClick(
    item: ElementsResultItem,
    event: MouseEvent<HTMLDivElement>,
  ): void {
    navigate(`/element/${item.elementName}`)
  }

  return (
    <ToolbarContainer
      title={
        <>
          {filteredElementsCount > 0 ? `${filteredElementsCount} ` : ''}
          {filteredElementsCount === 1 ? 'element' : 'elements'}
        </>
      }
    >
      {elements.status === 'ok' ? (
        <div className="flex flex-col gap-y-4 p-4">
          {Object.entries(elements.data).map(([filename, results], index) => (
            <Card key={index}>
              <div className="sticky top-0 rounded-t-md border-b border-gray-300 bg-white px-4 py-2">
                <Filename
                  name={filename}
                  additionalData={`${results.length} elements`}
                />
              </div>

              {results.map((result, index) => (
                <ElementsListItem
                  key={index}
                  item={result}
                  onClick={(event) => handleItemClick(result, event)}
                />
              ))}
            </Card>
          ))}

          {Object.keys(elements.data).length === 0 ? (
            <EmptyIndicator text="No elements found" />
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
