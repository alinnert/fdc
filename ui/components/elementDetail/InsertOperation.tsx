import { FC } from 'react'
import { InsertOperationItem } from '../../../global/ElementDetailResult.js'
import { Filename } from '../ui/Filename.js'
import { usePathSegments } from '../ui/usePathSegments.js'

interface Props {
  insertOperation: InsertOperationItem
}

export const InsertOperation: FC<Props> = ({ insertOperation }) => {
  const { path, filename } = usePathSegments(insertOperation.filename)

  return (
    <div className="my-2">
      <div className="text-orange-700 mb-1 px-4 font-mono font-semibold">
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
