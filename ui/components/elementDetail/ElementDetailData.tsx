import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import {
  currentFilenameState,
  elementDetailState,
} from '../../states/elementDetailStates'
import { elementsState } from '../../states/elementsStates'
import { Card } from '../ui/Card'
import { Filename } from '../ui/Filename'

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
        <Card className='sticky top-0 z-1'>
          <div className="p-4">
            <Filename name={currentFilename} />
          </div>
        </Card>
      ) : null}

      {elementDetail.data.familyConfigs.length > 0 ? (
        <Card>
          {elementDetail.data.familyConfigs.map((familyConfig, index) => (
            <div key={index} className="my-2 grid grid-cols-[1fr,3fr]">
              <div className="px-4 py-2 font-semibold text-gray-500">
                Configured as
              </div>

              <div className="px-4 py-2">{familyConfig.familyType}</div>

              <div className="col-start-1 col-end-3 px-4 pb-4 text-sm">
                {familyConfig.filename} ({familyConfig.line})
              </div>
            </div>
          ))}
        </Card>
      ) : null}

      {elementDetail.data.insertOperations.length > 0 ? (
        <Card>
          {elementDetail.data.insertOperations.map((insertOperation, index) => (
            <div key={index} className="my-2 grid grid-cols-[1fr,3fr]">
              <div className="px-4 py-2 font-semibold text-gray-500">
                Insert Operation
              </div>
              <div className="px-4 py-2"></div>
              <div className="col-start-1 col-end-3 px-4 pb-4 text-sm">
                {insertOperation.filename} ({insertOperation.line})
              </div>
            </div>
          ))}
        </Card>
      ) : null}
    </div>
  )
}
