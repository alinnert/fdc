import classNames from 'classnames'
import { FC, MouseEventHandler, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { ElementsResultItem } from '../../../global/ElementsResult'
import { elementNameState } from '../../states/elementDetailStates'

interface Props {
  item: ElementsResultItem
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const ElementsListItem: FC<Props> = ({ item, onClick }) => {
  const elementName = useRecoilValue(elementNameState)

  const isCurrentItem = useMemo(() => {
    return item.elementName === elementName
  }, [elementName, item.elementName])

  return (
    <div
      className={classNames(
        'grid select-none grid-cols-[1fr,auto] items-center px-4 py-2',
        {
          'bg-rose-900 text-white hover:bg-rose-800': isCurrentItem,
          'hover:bg-gray-50': !isCurrentItem,
        },
      )}
      onClick={onClick}
    >
      <div className="font-mono">&lt;{item.elementName}&gt;</div>
      <div
        className={classNames('text-sm', {
          'text-white': isCurrentItem,
          'text-gray-500': !isCurrentItem,
        })}
      >
        Zeile {item.lineNumber}
      </div>
    </div>
  )
}
