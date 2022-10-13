import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import {
  currentFilenameState,
  elementDetailState,
} from '../../states/elementDetailStates'
import { elementsState } from '../../states/elementsStates'
import { Card } from '../ui/Card'
import { Filename } from '../ui/Filename'
import { FamilyConfiguration } from './FamilyConfiguration'
import { InsertOperation } from './InsertOperation'

export const ElementDetailData: FC = () => {
  const elementDetail = useRecoilValue(elementDetailState)
  const elements = useRecoilValue(elementsState)
  const currentFilename = useRecoilValue(currentFilenameState)

  if (elementDetail === null) {
    return <div>No element data available</div>
  }

  if (elementDetail.status === 'error') {
    return <div>Error: {elementDetail.error}</div>
  }

  return (
    <div className="flex flex-col gap-y-4 p-4">
      {elements.status === 'ok' && currentFilename !== null ? (
        <Card className="z-1 sticky top-0">
          <div className="p-4">
            <Filename name={currentFilename} />
          </div>
        </Card>
      ) : null}

      {elementDetail.data.familyConfigs.length > 0 ? (
        <Card title='Configurations'>
          {elementDetail.data.familyConfigs.map((familyConfig, index) => (
            <FamilyConfiguration key={index} familyConfig={familyConfig} />
          ))}
        </Card>
      ) : null}

      {elementDetail.data.insertOperations.length > 0 ? (
        <Card>
          {elementDetail.data.insertOperations.map((insertOperation, index) => (
            <InsertOperation key={index} insertOperation={insertOperation} />
          ))}
        </Card>
      ) : null}
    </div>
  )
}
