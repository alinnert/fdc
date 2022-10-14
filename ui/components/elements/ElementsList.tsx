import { FC, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { ElementsResultItem } from '../../../global/ElementsResult'
import {
  filteredElementsCountState,
  filteredElementsState,
} from '../../states/filterStates'
import { Card } from '../ui/Card'
import { EmptyIndicator } from '../ui/EmptyIndicator'
import { ToolbarContainer } from '../ui/ToolbarContainer'
import { ElementsListHeader } from './ElementsListHeader'
import { ElementsListItem } from './ElementsListItem'

export const ElementsList: FC = () => {
  const navigate = useNavigate()
  const elements = useRecoilValue(filteredElementsState)
  const filteredElementsCount = useRecoilValue(filteredElementsCountState)

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
          {Object.entries(elements.data).map(([filePath, results], index) => (
            <Card key={index}>
              <ElementsListHeader filePath={filePath} results={results} />

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
