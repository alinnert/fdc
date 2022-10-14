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
      <div className="mb-1 px-4 font-semibold text-orange-700">
        Contextual insert
      </div>

      <div className="col-start-1 col-end-3 px-4 pb-2 text-sm">
        <Filename
          path={path}
          filename={filename}
          lineNumber={insertOperation.line}
        />
      </div>
    </div>
  )
}
