import { FC, ReactElement, ReactNode } from 'react'

interface Props {
  content?: ReactNode
  icon?: ReactElement
}

export const EmptyIndicator: FC<Props> = ({ content, icon }) => {
  return (
    <div className="grid h-full grid-rows-[1fr,auto,auto,1fr] items-center justify-center">
      <div></div>
      <div className="mb-2 flex justify-center text-gray-400">{icon}</div>
      <div className="text-gray-600 text-lg">{content}</div>
    </div>
  )
}
