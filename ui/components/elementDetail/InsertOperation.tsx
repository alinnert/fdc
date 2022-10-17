import { FC } from 'react'
import { InsertOperationItem } from '../../../global/ElementDetailResult'
import { Filename } from '../ui/Filename'
import { usePathSegments } from '../ui/usePathSegments'

interface Props {
  insertOperation: InsertOperationItem
}

export const InsertOperation: FC<Props> = ({ insertOperation }) => {
  const { path, filename } = usePathSegments(insertOperation.filename)

  return (
    <div className="my-2">
      <div className="mb-1 px-4 font-mono font-semibold text-orange-700">
        {insertOperation.operationName}
      </div>

      <div className="px-4 pb-2 text-sm">
        <Filename
          path={path}
          filename={filename}
          lineNumber={insertOperation.line}
        />
      </div>
    </div>
  )
}
