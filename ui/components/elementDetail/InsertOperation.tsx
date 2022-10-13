import { FC } from 'react'
import { InsertOperationItem } from '../../../global/ElementDetailResult'

interface Props {
  insertOperation: InsertOperationItem
}

export const InsertOperation: FC<Props> = ({ insertOperation }) => {
  return (
    <div className="my-2 grid grid-cols-[1fr,3fr]">
      <div className="px-4 font-semibold text-orange-700">
        Insert Operation
      </div>
      <div className="px-4 py-2"></div>
      <div className="col-start-1 col-end-3 px-4 pb-2 text-sm">
        {insertOperation.filename} ({insertOperation.line})
      </div>
    </div>
  )
}
