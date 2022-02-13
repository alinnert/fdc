import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { elementDetailState } from '../../states/elementDetailStates'

export const ElementDetailData: FC = () => {
  const elementDetail = useRecoilValue(elementDetailState)

  if (elementDetail === null) {
    return <div>No element data available</div>
  }

  if (elementDetail.status === 'error') {
    return <div>Error: {elementDetail.error}</div>
  }

  return (
    <div>
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
    </div>
  )
}
