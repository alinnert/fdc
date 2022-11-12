import classNames from 'classnames'
import { FC, Fragment, MouseEventHandler, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { ElementsResultItem } from '../../../global/ElementsResult.js'
import { elementNameState } from '../../states/elementDetailStates.js'

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
      <div className="font-mono">
        {item.parents !== undefined
          ? item.parents.map((parent, index) => (
              <Fragment key={index}>
                <span>&lt;{parent}&gt;</span> &raquo;{' '}
              </Fragment>
            ))
          : null}
        <span>&lt;{item.elementName}&gt;</span>
      </div>
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
