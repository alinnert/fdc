import classNames from 'classnames'
import { FC, MouseEventHandler, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { ElementsResultItem } from '../../../global/ElementsResult.js'
import {
  elementPathsAreEqual,
  getElementPathFromElementResultItem,
} from '../../lib/elements.js'
import { elementPathState } from '../../states/elementDetailStates.js'
import { ElementPath } from '../ui/elementPath.js'

interface Props {
  item: ElementsResultItem
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const ElementsListItem: FC<Props> = ({ item, onClick }) => {
  const elementPath = useRecoilValue(elementPathState)

  const isCurrentItem = useMemo(() => {
    return elementPathsAreEqual(
      getElementPathFromElementResultItem(item),
      elementPath ?? '',
    )
  }, [elementPath, item])

  return (
    <div
      className={classNames(
        'grid select-none grid-cols-[1fr,auto] items-center px-4 py-2',
        {
          'bg-brand-900 text-white hover:bg-brand-800': isCurrentItem,
          'hover:bg-neutral-50': !isCurrentItem,
        },
      )}
      onClick={onClick}
    >
      <div className="font-mono">
        <ElementPath
          path={[...(item.parents ?? []), item.elementName]}
          color={isCurrentItem ? 'brand-dark' : 'neutral-light'}
        />
      </div>
    </div>
  )
}
