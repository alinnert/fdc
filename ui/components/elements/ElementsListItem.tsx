import { FC, MouseEventHandler } from 'react'
import { ElementsResultItem } from '../../../global/ElementsResult'

interface Props {
  item: ElementsResultItem
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const ElementsListItem: FC<Props> = ({ item, onClick }) => {
  return (
    <div
      className="grid select-none grid-cols-[1fr,auto] items-center border-b border-gray-300 px-4 py-2 last:border-b-0 hover:bg-gray-100"
      onClick={onClick}
    >
      <div className="font-semibold">&lt;{item.elementName}&gt;</div>
      <div className="text-sm text-gray-500">Zeile {item.lineNumber}</div>
    </div>
  )
}
