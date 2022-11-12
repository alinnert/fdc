import classNames from 'classnames'
import { FC } from 'react'
import { ElementsResultItem } from '../../../global/ElementsResult.js'
import { Filename } from '../ui/Filename.js'
import { usePathSegments } from '../ui/usePathSegments.js'

interface Props {
  filePath: string
  results: ElementsResultItem[]
}

export const ElementsListHeader: FC<Props> = ({ filePath, results }) => {
  const { path, filename } = usePathSegments(filePath)

  return (
    <div
      className={classNames(
        'sticky top-0',
        'bg-gray-100',
        'border-b border-gray-300',
        'px-4 py-2',
      )}
    >
      <Filename
        path={path}
        filename={filename}
        additionalData={`${results.length} elements`}
      />
    </div>
  )
}
