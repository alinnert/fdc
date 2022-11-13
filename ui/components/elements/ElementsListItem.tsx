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
          'bg-brand-900 text-white hover:bg-brand-800': isCurrentItem,
          'hover:bg-neutral-50': !isCurrentItem,
        },
      )}
      onClick={onClick}
    >
      <div className="font-mono">
        {item.parents !== undefined
          ? item.parents.map((parent, index) => (
              <Fragment key={index}>
                <span
                  className={classNames({
                    'text-brand-300': isCurrentItem,
                    'text-neutral-400': !isCurrentItem,
                  })}
                >
                  &lt;{parent}&gt;
                </span>{' '}
                <span
                  className={classNames({
                    'text-brand-400': isCurrentItem,
                    'text-neutral-300': !isCurrentItem,
                  })}
                >
                  &raquo;
                </span>{' '}
              </Fragment>
            ))
          : null}
        <span>&lt;{item.elementName}&gt;</span>
      </div>
    </div>
  )
}
