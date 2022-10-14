import classNames from 'classnames'
import { FC } from 'react'
import { ElementsResultItem } from '../../../global/ElementsResult'
import { Filename } from '../ui/Filename'
import { usePathSegments } from '../ui/usePathSegments'

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
        'rounded-t-md',
        'border-b border-gray-300',
        'bg-white',
        'px-4 py-2',
      )}
    >
      <Filename
        path={path}
        filename={filename}
        additionalData={`${results.length} elements`}
        highlight
      />
    </div>
  )
}
