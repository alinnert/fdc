import classNames from 'classnames'
import { FC } from 'react'
import {
  ElementsResultItem,
  SearchableElementsResultItem,
} from '../../../global/ElementsResult.js'
import { Filename } from '../ui/Filename.js'
import { usePathSegments } from '../ui/usePathSegments.js'

interface Props {
  filePath: string
  results: ElementsResultItem[] | SearchableElementsResultItem[]
}

export const ElementsListHeader: FC<Props> = ({ filePath, results }) => {
  const { path, filename } = usePathSegments(filePath)

  return (
    <div
      className={classNames(
        'sticky top-0',
        'bg-neutral-100',
        'border-b border-neutral-300',
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
