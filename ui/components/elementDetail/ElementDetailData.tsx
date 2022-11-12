import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import {
  currentFileDataState,
  elementDetailState,
} from '../../states/elementDetailStates.js'
import { elementsState } from '../../states/elementsStates.js'
import { Card } from '../ui/Card.js'
import { Filename } from '../ui/Filename.js'
import { usePathSegments } from '../ui/usePathSegments.js'
import { FamilyConfiguration } from './FamilyConfiguration.js'
import { InsertOperation } from './InsertOperation.js'

export const ElementDetailData: FC = () => {
  const elementDetail = useRecoilValue(elementDetailState)
  const elements = useRecoilValue(elementsState)
  const currentFileData = useRecoilValue(currentFileDataState)

  const { path, filename } = usePathSegments(currentFileData?.filename ?? '')

  if (elementDetail === null) {
    return <div>No element data available</div>
  }

  if (elementDetail.status === 'error') {
    return <div>Error: {elementDetail.error}</div>
  }

  return (
    <div className="flex flex-col gap-y-4 p-4">
      {elements.status === 'ok' && currentFileData !== null ? (
        <Card className="z-1 sticky top-0">
          <div className="p-4">
            <Filename
              path={path}
              filename={filename}
              lineNumber={currentFileData.lineNumber}
            />
          </div>
        </Card>
      ) : null}

      {elementDetail.data.familyConfigs.length > 0 ? (
        <Card
          title={
            elementDetail.data.familyConfigs.length === 1
              ? '1 family config'
              : `${elementDetail.data.familyConfigs.length} family configs`
          }
          titleIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M19 5.5a4.5 4.5 0 01-4.791 4.49c-.873-.055-1.808.128-2.368.8l-6.024 7.23a2.724 2.724 0 11-3.837-3.837L9.21 8.16c.672-.56.855-1.495.8-2.368a4.5 4.5 0 015.873-4.575c.324.105.39.51.15.752L13.34 4.66a.455.455 0 00-.11.494 3.01 3.01 0 001.617 1.617c.17.07.363.02.493-.111l2.692-2.692c.241-.241.647-.174.752.15.14.435.216.9.216 1.382zM4 17a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          {elementDetail.data.familyConfigs.map((familyConfig, index) => (
            <FamilyConfiguration key={index} familyConfig={familyConfig} />
          ))}
        </Card>
      ) : null}

      {elementDetail.data.insertOperations.length > 0 ? (
        <Card
          title={
            elementDetail.data.insertOperations.length === 1
              ? '1 insert operation'
              : `${elementDetail.data.insertOperations.length} insert operations`
          }
          titleIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          {elementDetail.data.insertOperations.map((insertOperation, index) => (
            <InsertOperation key={index} insertOperation={insertOperation} />
          ))}
        </Card>
      ) : null}
    </div>
  )
}
