import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import {
  elementDetailState,
  elementNameState,
} from '../../states/elementDetailStates'

export const ElementDetailTitle: FC = () => {
  const elementName = useRecoilValue(elementNameState)
  const elementDetail = useRecoilValue(elementDetailState)

  const ok = elementDetail?.status === 'ok'
  const familyConfigsCount = ok ? elementDetail.data.familyConfigs.length : 0
  const insertOperationsCount = ok
    ? elementDetail.data.insertOperations.length
    : 0

  return (
    <>
      <span key="element name" className="">
        &lt;{elementName ?? '-'}&gt;
      </span>

      {familyConfigsCount > 0 ? (
        <span
          key="family configs"
          className="ml-4 rounded-lg bg-cyan-600 px-2 py-1 text-sm font-bold text-white"
        >
          {familyConfigsCount}{' '}
          {familyConfigsCount === 1 ? 'family config' : 'family configs'}
        </span>
      ) : null}

      {ok && elementDetail.data.insertOperations.length > 0 ? (
        <span
          key="insert operations"
          className="ml-4 rounded-lg bg-orange-600 px-2 py-1 text-sm font-bold text-white"
        >
          {insertOperationsCount}{' '}
          {insertOperationsCount === 1
            ? 'insert operation'
            : 'insert operations'}
        </span>
      ) : null}
    </>
  )
}
