import { FC } from 'react'
import { InsertOperationItem } from '../../../global/ElementDetailResult'
import { usePathSegments } from '../ui/usePathSegments'

interface Props {
  insertOperation: InsertOperationItem
}

export const InsertOperation: FC<Props> = ({ insertOperation }) => {
  const { path, filename } = usePathSegments(insertOperation.filename)

  return (
    <div className="my-2 grid grid-cols-[1fr,3fr]">
      <div className="px-4 font-semibold text-orange-700">Contextual insert</div>
      <div className="px-4 py-2"></div>
      <div className="col-start-1 col-end-3 px-4 pb-2 text-sm">
        <div>{path}</div>
        <div>
          <span className="font-semibold">{filename}:</span>{' '}
          <span className="font-semibold text-pink-700">
            {insertOperation.line}
          </span>
        </div>
      </div>
    </div>
  )
}
